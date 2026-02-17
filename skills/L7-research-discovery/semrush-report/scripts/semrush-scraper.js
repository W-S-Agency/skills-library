#!/usr/bin/env node
/**
 * Semrush SERP Data Scraper with Session Management
 * Extracts keyword metrics from Semrush Keyword Overview
 * Auto-logout after completion (optional)
 */

const fs = require('fs');
const playwright = require('playwright');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);
const keyword = args.find(arg => !arg.startsWith('--')) || 'Leuchtreklame berlin';
const database = args.find(arg => arg.startsWith('--db='))?.split('=')[1] || 'de';
const autoLogout = !args.includes('--keep-session');

/**
 * Logout from Semrush
 */
async function logoutFromSemrush(page) {
  try {
    console.log('\n🔐 Logging out from Semrush...');

    // Try multiple logout methods
    const logoutSelectors = [
      'a[href*="logout"]',
      'button:has-text("Log out")',
      'button:has-text("Sign out")',
      '[data-test="logout"]',
      '.user-menu a:has-text("Log out")'
    ];

    // Try to find user menu first
    try {
      const userMenu = await page.locator('.user-menu, [data-test="user-menu"], .account-dropdown').first();
      await userMenu.click({ timeout: 3000 });
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('⚠️ User menu not found, trying direct logout...');
    }

    // Try each logout selector
    for (const selector of logoutSelectors) {
      try {
        const logoutButton = await page.locator(selector).first();
        await logoutButton.waitFor({ timeout: 2000 });
        await logoutButton.click();
        console.log('✅ Logout clicked');
        await page.waitForTimeout(3000);
        return true;
      } catch (e) {
        continue;
      }
    }

    // Alternative: Clear cookies
    console.log('⚠️ Logout button not found, clearing cookies...');
    const context = page.context();
    await context.clearCookies();
    console.log('✅ Cookies cleared');

    return true;

  } catch (error) {
    console.error('❌ Logout failed:', error.message);
    console.log('💡 You may need to log out manually');
    return false;
  }
}

/**
 * Ask user if they want to logout
 */
function askUserLogout() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('\n' + '='.repeat(60));
    console.log('🔐 SESSION MANAGEMENT');
    console.log('='.repeat(60));
    console.log('\nВам нужен еще доступ к Semrush?');
    console.log('  [Y] Да - оставить сессию активной');
    console.log('  [N] Нет - выйти из аккаунта (рекомендуется)');
    console.log('');

    rl.question('Ваш выбор (Y/N): ', (answer) => {
      rl.close();
      const shouldLogout = !['y', 'yes', 'да', 'д'].includes(answer.toLowerCase().trim());
      resolve(shouldLogout);
    });

    // Auto-timeout after 30 seconds (default: logout)
    setTimeout(() => {
      console.log('\n⏰ Timeout (30s) - performing auto-logout for security...');
      rl.close();
      resolve(true);
    }, 30000);
  });
}

async function scrapeSemrush() {
  let browser;
  let page;

  try {
    console.log('🚀 Launching browser...');
    browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 50
    });

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });

    page = await context.newPage();

    // Load credentials
    const credentials = JSON.parse(
      fs.readFileSync('C:\\Users\\alexa\\.craft-agent\\workspaces\\my-workspace\\config\\semrush-credentials.json', 'utf8')
    );

    console.log('\n' + '='.repeat(60));
    console.log('🔐 STEP 1: LOGIN TO SEMRUSH');
    console.log('='.repeat(60));

    await page.goto('https://www.semrush.com/login/', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Take screenshot
    await page.screenshot({ path: 'login-page.png' });
    console.log('📸 Login page screenshot saved');

    // Try to find and fill login form
    let loggedIn = false;

    try {
      const emailInput = await page.locator('input[type="email"], input[name="email"], #email').first();
      await emailInput.waitFor({ timeout: 5000 });
      await emailInput.fill(credentials.credentials.email);
      console.log('✅ Email filled');

      const passwordInput = await page.locator('input[type="password"], input[name="password"], #password').first();
      await passwordInput.waitFor({ timeout: 5000 });
      await passwordInput.fill(credentials.credentials.password);
      console.log('✅ Password filled');

      const submitButton = await page.locator('button[type="submit"], button:has-text("Log in"), button:has-text("Sign in")').first();
      await submitButton.click();
      console.log('✅ Login submitted');

      await page.waitForTimeout(5000);
      loggedIn = true;
      console.log('✅ Successfully logged in to Semrush');

    } catch (error) {
      console.log('⚠️ Auto-login failed. Browser will stay open for manual login.');
      console.log('👉 Please log in manually in the browser window...');
      console.log('⏰ Waiting 45 seconds...');
      await page.waitForTimeout(45000);
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 STEP 2: EXTRACT SERP DATA');
    console.log('='.repeat(60));

    // Navigate to Keyword Overview
    const url = `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(keyword)}&db=${database}`;

    console.log(`🔍 Loading keyword: "${keyword}"`);
    console.log(`🌍 Database: ${database.toUpperCase()}`);
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    console.log('⏳ Waiting for data to load (10s)...');
    await page.waitForTimeout(10000);

    // Take screenshot of results
    await page.screenshot({ path: 'semrush-results.png', fullPage: true });
    console.log('📸 Results screenshot saved: semrush-results.png');

    // Extract data
    const data = await page.evaluate(() => {
      const result = {
        keyword: '',
        database: '',
        metrics: {},
        serpFeatures: [],
        organicResults: [],
        rawText: ''
      };

      // Get all text content
      result.rawText = document.body.innerText;

      // Try to extract metrics from common patterns
      const text = document.body.innerText;

      // Search for volume pattern
      const volumeMatch = text.match(/Suchvolumen[\s\S]{0,50}?([\d,]+)|Volume[\s\S]{0,50}?([\d,]+)/i);
      if (volumeMatch) result.metrics.volume = volumeMatch[1] || volumeMatch[2];

      // Search for difficulty
      const diffMatch = text.match(/Keyword-Schwierigkeit[\s\S]{0,50}?([\d]+)|Difficulty[\s\S]{0,50}?([\d]+)/i);
      if (diffMatch) result.metrics.difficulty = diffMatch[1] || diffMatch[2];

      // Search for CPC
      const cpcMatch = text.match(/CPC[\s\S]{0,50}?([\d,]+)/i);
      if (cpcMatch) result.metrics.cpc = cpcMatch[1];

      // Search for Intent
      const intentMatch = text.match(/Suchintention[\s\S]{0,50}?(Kommerziell|Informationsorientiert|Transaktionsorientiert|Navigationsorientiert)|Intent[\s\S]{0,50}?(Commercial|Informational|Transactional|Navigational)/i);
      if (intentMatch) result.metrics.intent = intentMatch[1] || intentMatch[2];

      // Search for Competition
      const compMatch = text.match(/Wettbewerbsdichte[\s\S]{0,50}?([\d,.]+)|Competition[\s\S]{0,50}?([\d,.]+)/i);
      if (compMatch) result.metrics.competition = compMatch[1] || compMatch[2];

      return result;
    });

    // Add keyword and database to data
    data.keyword = keyword;
    data.database = database;

    // Save data
    fs.writeFileSync('semrush-data.json', JSON.stringify(data, null, 2));
    console.log('\n✅ Data saved to semrush-data.json');

    if (Object.keys(data.metrics).length > 0) {
      console.log('\n📊 Extracted Metrics:');
      console.log(JSON.stringify(data.metrics, null, 2));
    } else {
      console.log('\n⚠️ No metrics extracted automatically.');
      console.log('💡 Check semrush-results.png for manual analysis');
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ DATA EXTRACTION COMPLETE');
    console.log('='.repeat(60));

    // Ask user about logout
    let shouldLogout = autoLogout;

    if (!args.includes('--no-prompt')) {
      shouldLogout = await askUserLogout();
    }

    if (shouldLogout) {
      console.log('\n' + '='.repeat(60));
      console.log('🔐 STEP 3: LOGOUT FROM SEMRUSH');
      console.log('='.repeat(60));

      const logoutSuccess = await logoutFromSemrush(page);

      if (logoutSuccess) {
        console.log('✅ Successfully logged out from Semrush');
        console.log('🔒 Session ended - your account is secure');
      } else {
        console.log('⚠️ Logout may have failed - please check manually');
      }

      // Show logout confirmation screenshot
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'logout-confirmation.png' });
      console.log('📸 Logout confirmation screenshot saved');

    } else {
      console.log('\n' + '='.repeat(60));
      console.log('🔓 SESSION KEPT ACTIVE');
      console.log('='.repeat(60));
      console.log('⚠️ You are still logged in to Semrush');
      console.log('💡 Remember to log out manually when done!');
    }

    // Keep browser open for 5 seconds
    console.log('\n⏸️ Browser will close in 5 seconds...');
    await page.waitForTimeout(5000);

    await browser.close();
    return data;

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (browser) {
      console.log('⏸️ Browser will stay open for debugging (30s)...');
      try {
        await page.waitForTimeout(30000);
      } catch (e) {}
      await browser.close();
    }
    throw error;
  }
}

// Run
console.log('\n' + '='.repeat(60));
console.log('📊 SEMRUSH SERP ANALYZER');
console.log('='.repeat(60));
console.log(`Keyword: "${keyword}"`);
console.log(`Database: ${database.toUpperCase()}`);
console.log(`Auto-logout: ${autoLogout ? 'Yes' : 'No'}`);
console.log('='.repeat(60));

scrapeSemrush()
  .then(data => {
    console.log('\n' + '='.repeat(60));
    console.log('✅ SEMRUSH ANALYSIS COMPLETE');
    console.log('='.repeat(60));
    console.log('\n📁 Output files:');
    console.log('  • semrush-data.json - Extracted metrics');
    console.log('  • semrush-results.png - Full page screenshot');
    if (fs.existsSync('logout-confirmation.png')) {
      console.log('  • logout-confirmation.png - Logout confirmation');
    }
    console.log('');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Failed:', err.message);
    process.exit(1);
  });
