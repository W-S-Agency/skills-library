#!/usr/bin/env node
/**
 * Analyze all skills for external sources
 * Searches for YAML frontmatter, author info, and source URLs
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const KEYWORDS = ['source', 'author', 'based', 'fork', 'credit', 'original', 'upstream', 'adapted', 'license'];

// Results storage
const results = {
  total: 0,
  withFrontmatter: 0,
  withAuthor: 0,
  withSource: 0,
  external: [],
  internal: []
};

function findSkillFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findSkillFiles(fullPath));
    } else if (item.name === 'SKILL.md' || item.name === 'README.md') {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = match[1];
  const data = {};

  // Simple YAML parser for key: value pairs
  yaml.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      data[key] = value;
    }
  });

  return data;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(SKILLS_DIR, filePath);
  const skillName = path.dirname(relativePath).split(path.sep).pop();

  results.total++;

  // Parse frontmatter
  const frontmatter = parseFrontmatter(content);

  const analysis = {
    path: relativePath,
    name: skillName,
    hasFrontmatter: !!frontmatter,
    author: null,
    source: null,
    license: null,
    adapted: false,
    keywords: []
  };

  if (frontmatter) {
    results.withFrontmatter++;

    // Extract metadata
    analysis.author = frontmatter.author || frontmatter.creator || null;
    analysis.source = frontmatter.source || frontmatter.upstream || frontmatter.original || null;
    analysis.license = frontmatter.license || frontmatter.source_license || null;
    analysis.adapted = frontmatter.adapted === 'true' || frontmatter.adapted === true;

    if (analysis.author) results.withAuthor++;
    if (analysis.source) results.withSource++;
  }

  // Search for keywords in content
  const lowerContent = content.toLowerCase();
  KEYWORDS.forEach(keyword => {
    if (lowerContent.includes(keyword)) {
      analysis.keywords.push(keyword);
    }
  });

  // Classify as external or internal
  const isExternal = !!(analysis.source ||
                        (analysis.author && !analysis.author.includes('Alexander Wirt') &&
                         !analysis.author.includes('2Penguins') &&
                         !analysis.author.includes('W-S-Agency') &&
                         !analysis.author.includes('WS Workspace')));

  if (isExternal) {
    results.external.push(analysis);
  } else {
    results.internal.push(analysis);
  }

  return analysis;
}

// Main execution
console.log('🔍 Analyzing skills library for external sources...\n');

const skillFiles = findSkillFiles(SKILLS_DIR);
console.log(`Found ${skillFiles.length} skill files\n`);

skillFiles.forEach(analyzeFile);

// Report results
console.log('📊 Analysis Results:');
console.log('='.repeat(60));
console.log(`Total skills analyzed: ${results.total}`);
console.log(`Skills with YAML frontmatter: ${results.withFrontmatter}`);
console.log(`Skills with author info: ${results.withAuthor}`);
console.log(`Skills with source URLs: ${results.withSource}`);
console.log(`External skills: ${results.external.length}`);
console.log(`Internal skills: ${results.internal.length}`);
console.log('='.repeat(60));

if (results.external.length > 0) {
  console.log('\n🌐 External Skills Found:');
  console.log('='.repeat(60));

  results.external.forEach((skill, i) => {
    console.log(`\n${i + 1}. ${skill.name}`);
    console.log(`   Path: ${skill.path}`);
    if (skill.author) console.log(`   Author: ${skill.author}`);
    if (skill.source) console.log(`   Source: ${skill.source}`);
    if (skill.license) console.log(`   License: ${skill.license}`);
    if (skill.adapted) console.log(`   Adapted: Yes`);
    if (skill.keywords.length > 0) console.log(`   Keywords: ${skill.keywords.join(', ')}`);
  });
} else {
  console.log('\n✅ No external skills found - all skills are internal');
}

// Save results to JSON
const outputPath = path.join(__dirname, 'external-sources-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\n💾 Full results saved to: ${outputPath}`);

// Generate markdown report
const reportLines = [
  '# External Sources Analysis Report',
  '',
  `**Date:** ${new Date().toISOString().split('T')[0]}`,
  `**Total Skills Analyzed:** ${results.total}`,
  '',
  '## Summary',
  '',
  `- Skills with YAML frontmatter: ${results.withFrontmatter}`,
  `- Skills with author info: ${results.withAuthor}`,
  `- Skills with source URLs: ${results.withSource}`,
  `- **External skills: ${results.external.length}**`,
  `- Internal skills: ${results.internal.length}`,
  ''
];

if (results.external.length > 0) {
  reportLines.push('## External Skills', '');
  reportLines.push('| Skill | Author | Source | License | Adapted |');
  reportLines.push('|-------|--------|--------|---------|---------|');

  results.external.forEach(skill => {
    reportLines.push(`| ${skill.name} | ${skill.author || '—'} | ${skill.source || '—'} | ${skill.license || '—'} | ${skill.adapted ? 'Yes' : 'No'} |`);
  });
} else {
  reportLines.push('## ✅ Result', '', 'All skills are **internal** — no external sources detected.');
}

const reportPath = path.join(__dirname, 'external-sources-report.md');
fs.writeFileSync(reportPath, reportLines.join('\n'));
console.log(`📄 Markdown report saved to: ${reportPath}`);

process.exit(0);
