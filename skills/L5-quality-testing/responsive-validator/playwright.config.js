/**
 * Playwright Configuration
 * Used for browser installation and optional Playwright Test integration
 */

import { defineConfig, devices } from '@playwright/test';
import { homedir } from 'os';
import { join } from 'path';

export default defineConfig({
  testDir: './tests',

  // Test timeout
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Fail fast
  fullyParallel: true,

  // Retry on CI
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 4 : undefined,

  // Reporter
  reporter: [
    ['html', { outputFolder: join(homedir(), '.ws-workspace', 'reports', 'responsive-validator', 'playwright-report') }],
    ['json', { outputFile: join(homedir(), '.ws-workspace', 'reports', 'responsive-validator', 'results.json') }]
  ],

  // Shared settings
  use: {
    // Base URL
    baseURL: process.env.TEST_URL || 'http://localhost:3000',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Trace on failure
    trace: 'on-first-retry',

    // Browser context options
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  },

  // Projects (browsers)
  projects: [
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        deviceScaleFactor: 2,
      },
    },

    // Mobile browsers
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 14 Pro'],
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 7'],
      },
    },
  ],

  // Web server (if testing local dev server)
  // webServer: {
  //   command: 'npm run dev',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },
});
