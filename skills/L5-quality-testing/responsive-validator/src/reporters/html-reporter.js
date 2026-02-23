/**
 * HTML Reporter - Generates interactive HTML reports
 */

import fs from 'fs-extra';
import { join } from 'path';
import { homedir } from 'os';

export async function generateReport(results, config) {
  const reportsDir = join(homedir(), '.ws-workspace', 'reports', 'responsive-validator');
  await fs.ensureDir(reportsDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = join(reportsDir, `report-${timestamp}.html`);

  const html = buildHtmlReport(results, config);
  await fs.writeFile(reportPath, html);

  return reportPath;
}

function buildHtmlReport(results, config) {
  const { summary, issues, browsers, url, duration } = results;

  const statusColor = summary.failed === 0 ? '#10b981' : '#ef4444';
  const statusText = summary.failed === 0 ? 'PASSED' : 'FAILED';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Validator Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      padding: 2rem;
    }
    .container { max-width: 1400px; margin: 0 auto; }

    /* Header */
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
    }
    .header h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .status-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      background: ${statusColor};
      color: white;
    }
    .meta {
      display: flex;
      gap: 2rem;
      margin-top: 1rem;
      color: #94a3b8;
      font-size: 0.875rem;
    }

    /* Summary Cards */
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 1.5rem;
    }
    .card-title {
      font-size: 0.875rem;
      color: #94a3b8;
      margin-bottom: 0.5rem;
    }
    .card-value {
      font-size: 2rem;
      font-weight: 700;
    }
    .card-value.green { color: #10b981; }
    .card-value.red { color: #ef4444; }
    .card-value.yellow { color: #f59e0b; }

    /* Issues Table */
    .section {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .section h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    .filter-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #334155;
      background: #0f172a;
      color: #e2e8f0;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }
    .filter-btn:hover { background: #1e293b; }
    .filter-btn.active {
      background: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #334155;
    }
    th {
      color: #94a3b8;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      user-select: none;
    }
    th:hover { color: #e2e8f0; }

    .severity-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .severity-critical {
      background: #ef4444;
      color: white;
    }
    .severity-warning {
      background: #f59e0b;
      color: white;
    }

    .browser-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: #334155;
      border-radius: 4px;
      font-size: 0.75rem;
      margin-right: 0.5rem;
    }

    /* Screenshots Grid */
    .screenshots {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    .screenshot-card {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      overflow: hidden;
    }
    .screenshot-card img {
      width: 100%;
      height: auto;
      display: block;
    }
    .screenshot-info {
      padding: 1rem;
    }
    .screenshot-title {
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .screenshot-meta {
      font-size: 0.75rem;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>
        🚀 Responsive Validator Report
        <span class="status-badge">${statusText}</span>
      </h1>
      <div class="meta">
        <span>📝 URL: <strong>${url}</strong></span>
        <span>⏱️ Duration: <strong>${(duration / 1000).toFixed(1)}s</strong></span>
        <span>📅 ${new Date().toLocaleString()}</span>
      </div>
    </div>

    <div class="summary">
      <div class="card">
        <div class="card-title">Total Tests</div>
        <div class="card-value">${browsers.length}</div>
      </div>
      <div class="card">
        <div class="card-title">Passed</div>
        <div class="card-value green">${summary.passed}</div>
      </div>
      <div class="card">
        <div class="card-title">Failed</div>
        <div class="card-value red">${summary.failed}</div>
      </div>
      <div class="card">
        <div class="card-title">Warnings</div>
        <div class="card-value yellow">${summary.warnings}</div>
      </div>
    </div>

    ${issues.length > 0 ? `
    <div class="section">
      <h2>🐛 Issues Found (${issues.length})</h2>
      <div class="filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="critical">Critical</button>
        <button class="filter-btn" data-filter="warning">Warnings</button>
        <button class="filter-btn" data-filter="visual">Visual</button>
        <button class="filter-btn" data-filter="layout">Layout</button>
        <button class="filter-btn" data-filter="accessibility">Accessibility</button>
        <button class="filter-btn" data-filter="performance">Performance</button>
      </div>
      <table id="issuesTable">
        <thead>
          <tr>
            <th data-sort="severity">Severity</th>
            <th data-sort="type">Type</th>
            <th data-sort="browser">Browser</th>
            <th data-sort="breakpoint">Breakpoint</th>
            <th data-sort="message">Message</th>
          </tr>
        </thead>
        <tbody>
          ${issues.map(issue => `
            <tr data-severity="${issue.severity}" data-type="${issue.type}">
              <td><span class="severity-badge severity-${issue.severity}">${issue.severity}</span></td>
              <td>${issue.type}</td>
              <td><span class="browser-badge">${issue.browser}</span></td>
              <td>${issue.breakpoint}</td>
              <td>${issue.message}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    ` : '<div class="section"><h2>✅ No Issues Found</h2><p>All tests passed successfully!</p></div>'}

    <div class="section">
      <h2>🖼️ Browser Matrix (${browsers.length} combinations)</h2>
      <table>
        <thead>
          <tr>
            <th>Browser</th>
            <th>Breakpoint</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${browsers.map(b => `
            <tr>
              <td><span class="browser-badge">${b.browser}</span></td>
              <td>${b.breakpoint}</td>
              <td>${b.category}</td>
              <td>${b.passed ? '✅ Pass' : '❌ Fail'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('#issuesTable tbody tr');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        rows.forEach(row => {
          if (filter === 'all') {
            row.style.display = '';
          } else if (filter === 'critical' || filter === 'warning') {
            row.style.display = row.dataset.severity === filter ? '' : 'none';
          } else {
            row.style.display = row.dataset.type.includes(filter) ? '' : 'none';
          }
        });
      });
    });

    // Sort functionality
    const headers = document.querySelectorAll('th[data-sort]');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const table = header.closest('table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const column = header.dataset.sort;
        const columnIndex = Array.from(header.parentNode.children).indexOf(header);

        rows.sort((a, b) => {
          const aText = a.children[columnIndex].textContent.trim();
          const bText = b.children[columnIndex].textContent.trim();
          return aText.localeCompare(bText);
        });

        rows.forEach(row => tbody.appendChild(row));
      });
    });
  </script>
</body>
</html>`;
}
