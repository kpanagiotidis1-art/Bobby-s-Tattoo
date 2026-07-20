import { chromium } from 'playwright'

const BASE_URL = 'http://localhost:5173'

const VIEWPORTS = {
  'small-phone': { width: 375, height: 667 }, // iPhone SE
  phone: { width: 390, height: 844 }, // iPhone 14/15
  tablet: { width: 768, height: 1024 }, // iPad portrait
  pc: { width: 1440, height: 900 }, // common laptop/desktop
  'highres-pc': { width: 1920, height: 1080 }, // Full HD desktop
}

// Home gets every breakpoint (longest, most complex page). Everything else
// just gets a mobile + desktop pass to catch major issues without excessive
// redundant screenshots.
const PAGES = [
  { path: '/', name: 'home', viewports: Object.keys(VIEWPORTS) },
  { path: '/faq', name: 'faq', viewports: ['phone', 'pc'] },
  { path: '/blog', name: 'blog', viewports: ['phone', 'pc'] },
  { path: '/aftercare', name: 'aftercare', viewports: ['phone', 'pc'] },
  { path: '/artists', name: 'artists', viewports: ['phone', 'pc'] },
  { path: '/consent', name: 'consent', viewports: ['phone', 'pc'] },
]

const browser = await chromium.launch()

for (const page of PAGES) {
  for (const viewportName of page.viewports) {
    const context = await browser.newContext({ viewport: VIEWPORTS[viewportName] })
    const tab = await context.newPage()
    await tab.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle' })
    await tab.screenshot({
      path: `.screenshots/${page.name}-${viewportName}.png`,
      fullPage: true,
    })
    await context.close()
    console.log(`captured ${page.name}-${viewportName}`)
  }
}

// Mobile nav open state — worth checking specifically since it's a common
// place for overflow/layout bugs.
const mobileNavContext = await browser.newContext({ viewport: VIEWPORTS.phone })
const mobileNavPage = await mobileNavContext.newPage()
await mobileNavPage.goto(BASE_URL, { waitUntil: 'networkidle' })
await mobileNavPage.getByRole('button', { name: /open menu/i }).click()
await mobileNavPage.waitForTimeout(300)
await mobileNavPage.screenshot({ path: '.screenshots/mobile-nav-open.png' })
await mobileNavContext.close()
console.log('captured mobile-nav-open')

await browser.close()
