#!/usr/bin/env node
/**
 * Deep analysis of skill content for external sources
 * Searches for GitHub URLs, repo mentions, author credits in full content
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', 'skills');

// Patterns to search for
const PATTERNS = {
  githubUrl: /https?:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+/gi,
  githubMention: /github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+/gi,
  sourceKeywords: /(?:source|based on|forked from|inspired by|adapted from|original|credit|author|created by|from)[\s:]+([^\n]{10,100})/gi,
  urlGeneral: /https?:\/\/[^\s)]+/gi,
};

const results = {
  total: 0,
  withGitHubUrls: [],
  withSourceMentions: [],
  withExternalUrls: [],
  potentialExternal: []
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

function analyzeContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(SKILLS_DIR, filePath);
  const skillName = path.dirname(relativePath).split(path.sep).pop();

  results.total++;

  const analysis = {
    name: skillName,
    path: relativePath,
    githubUrls: [],
    sourceMentions: [],
    externalUrls: [],
    isPotentialExternal: false
  };

  // Find GitHub URLs
  let match;
  while ((match = PATTERNS.githubUrl.exec(content)) !== null) {
    if (!analysis.githubUrls.includes(match[0])) {
      analysis.githubUrls.push(match[0]);
    }
  }

  // Find source mentions
  PATTERNS.sourceKeywords.lastIndex = 0;
  while ((match = PATTERNS.sourceKeywords.exec(content)) !== null) {
    const mention = match[0].trim();
    if (mention.length > 15 && mention.length < 150) {
      analysis.sourceMentions.push(mention);
    }
  }

  // Find other external URLs
  PATTERNS.urlGeneral.lastIndex = 0;
  while ((match = PATTERNS.urlGeneral.exec(content)) !== null) {
    const url = match[0];
    if (!url.includes('github.com') &&
        !url.includes('localhost') &&
        !url.includes('example.com') &&
        !url.includes('wsagency.dev')) {
      if (!analysis.externalUrls.includes(url)) {
        analysis.externalUrls.push(url);
      }
    }
  }

  // Determine if potentially external
  if (analysis.githubUrls.length > 0 ||
      analysis.sourceMentions.length > 0 ||
      (analysis.externalUrls.length > 2)) {
    analysis.isPotentialExternal = true;
  }

  // Store results
  if (analysis.githubUrls.length > 0) {
    results.withGitHubUrls.push(analysis);
  }
  if (analysis.sourceMentions.length > 0) {
    results.withSourceMentions.push(analysis);
  }
  if (analysis.externalUrls.length > 0) {
    results.withExternalUrls.push(analysis);
  }
  if (analysis.isPotentialExternal) {
    results.potentialExternal.push(analysis);
  }

  return analysis;
}

// Main execution
console.log('🔍 Deep analysis of skill content for external sources...\n');

const skillFiles = findSkillFiles(SKILLS_DIR);
console.log(`Analyzing ${skillFiles.length} skill files for GitHub URLs and source mentions\n`);

skillFiles.forEach(analyzeContent);

// Report
console.log('📊 Deep Analysis Results:');
console.log('='.repeat(70));
console.log(`Total skills analyzed: ${results.total}`);
console.log(`Skills with GitHub URLs: ${results.withGitHubUrls.length}`);
console.log(`Skills with source mentions: ${results.withSourceMentions.length}`);
console.log(`Skills with external URLs: ${results.withExternalUrls.length}`);
console.log(`Potential external skills: ${results.potentialExternal.length}`);
console.log('='.repeat(70));

if (results.potentialExternal.length > 0) {
  console.log('\n🌐 Potential External Skills:');
  console.log('='.repeat(70));

  results.potentialExternal.slice(0, 50).forEach((skill, i) => {
    console.log(`\n${i + 1}. ${skill.name}`);
    console.log(`   Path: ${skill.path}`);

    if (skill.githubUrls.length > 0) {
      console.log(`   GitHub URLs found:`);
      skill.githubUrls.slice(0, 3).forEach(url => {
        console.log(`     - ${url}`);
      });
    }

    if (skill.sourceMentions.length > 0) {
      console.log(`   Source mentions:`);
      skill.sourceMentions.slice(0, 2).forEach(mention => {
        console.log(`     - ${mention.substring(0, 80)}...`);
      });
    }

    if (skill.externalUrls.length > 0) {
      console.log(`   External URLs: ${skill.externalUrls.length} found`);
    }
  });

  if (results.potentialExternal.length > 50) {
    console.log(`\n... and ${results.potentialExternal.length - 50} more`);
  }
}

// Save results
const outputPath = path.join(__dirname, 'deep-source-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log(`\n💾 Full results saved to: ${outputPath}`);

// Generate detailed report
const reportLines = [
  '# Deep Source Analysis Report',
  '',
  `**Date:** ${new Date().toISOString().split('T')[0]}`,
  `**Total Skills:** ${results.total}`,
  '',
  '## Summary',
  '',
  `- Skills with GitHub URLs: **${results.withGitHubUrls.length}**`,
  `- Skills with source mentions: **${results.withSourceMentions.length}**`,
  `- Skills with external URLs: **${results.withExternalUrls.length}**`,
  `- **Potential external skills: ${results.potentialExternal.length}**`,
  ''
];

if (results.potentialExternal.length > 0) {
  reportLines.push('## Potential External Skills', '');
  reportLines.push('| Skill | GitHub URLs | Source Mentions | External URLs |');
  reportLines.push('|-------|-------------|-----------------|---------------|');

  results.potentialExternal.forEach(skill => {
    const gh = skill.githubUrls.length;
    const sm = skill.sourceMentions.length;
    const eu = skill.externalUrls.length;
    reportLines.push(`| ${skill.name} | ${gh} | ${sm} | ${eu} |`);
  });

  reportLines.push('', '## GitHub URLs Found', '');
  results.withGitHubUrls.slice(0, 30).forEach(skill => {
    reportLines.push(`### ${skill.name}`, '');
    skill.githubUrls.forEach(url => {
      reportLines.push(`- ${url}`);
    });
    reportLines.push('');
  });
}

const reportPath = path.join(__dirname, 'deep-source-report.md');
fs.writeFileSync(reportPath, reportLines.join('\n'));
console.log(`📄 Report saved to: ${reportPath}\n`);

process.exit(0);
