import { defineConfig } from '@playwright/test'
const production = process.env.TEST_PRODUCTION === '1'
const port = production ? 4173 : 5173
export default defineConfig({
  testDir: './tests/browser',
  timeout: 45000,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    viewport: { width: 1440, height: 960 },
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npm run ${production ? 'preview' : 'dev'} -- --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: true,
  },
})
