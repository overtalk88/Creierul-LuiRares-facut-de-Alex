import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { createHash } from 'node:crypto'
const hash = (b: Buffer) => createHash('sha256').update(b).digest('hex')
async function ready(page: Page) {
  await page.goto('/')
  await expect(page.locator('.canvas-host.ready canvas')).toBeVisible({ timeout: 20000 })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)
}

test('real model, picking, rotation, zoom, deep structures, reset and idle rendering', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    const prototype = WebGL2RenderingContext.prototype
    const original = prototype.drawElements
    Object.assign(window, { drawCalls: 0 })
    prototype.drawElements = function (...args: Parameters<typeof original>) {
      ;(window as unknown as { drawCalls: number }).drawCalls++
      return original.apply(this, args)
    }
  })
  await ready(page)
  const canvas = page.locator('canvas'),
    original = hash(await canvas.screenshot())
  const bounds = (await canvas.boundingBox())!
  // Park the pointer beside the canvas: overlays above it have hover states.
  const rest = () => page.mouse.move(bounds.x + bounds.width + 200, bounds.y + bounds.height + 70)
  await page.mouse.move(bounds.x + bounds.width * 0.5, bounds.y + bounds.height * 0.5)
  await page.mouse.down()
  await page.mouse.move(bounds.x + bounds.width * 0.7, bounds.y + bounds.height * 0.56, {
    steps: 10,
  })
  await page.mouse.up()
  expect(hash(await canvas.screenshot())).not.toBe(original)
  await expect(page.locator('.region-title')).toHaveCount(0)
  await page.getByRole('button', { name: 'Resetează vederea', exact: true }).click()
  await rest()
  await expect.poll(async () => hash(await canvas.screenshot())).toBe(original)
  await page.getByRole('button', { name: 'Mărește modelul', exact: true }).click()
  expect(hash(await canvas.screenshot())).not.toBe(original)
  await page.getByRole('button', { name: 'Resetează vederea', exact: true }).click()
  await canvas.click({ position: { x: bounds.width * 0.46, y: bounds.height * 0.42 } })
  await expect(page.locator('.region-title')).toBeVisible()
  await page.getByRole('button', { name: 'Toate structurile' }).click()
  await page.getByRole('button', { name: /Hipocamp Memorie/ }).click()
  await expect(page.getByRole('heading', { name: 'Hipocamp', exact: true })).toBeVisible()
  await expect(page.getByText('Exterior estompat automat')).toBeVisible()
  expect(hash(await canvas.screenshot())).not.toBe(original)
  await page.screenshot({ path: 'test-results/deep-desktop.png' })
  await page.getByRole('button', { name: 'Creierul Interactiv, revino la început' }).click()
  await rest()
  await expect(page.getByRole('textbox', { name: 'Caută o structură' })).toBeVisible()
  await expect.poll(async () => hash(await canvas.screenshot())).toBe(original)
  await page.waitForTimeout(500)
  const calls = await page.evaluate(() => (window as unknown as { drawCalls: number }).drawCalls)
  await page.waitForTimeout(800)
  expect(await page.evaluate(() => (window as unknown as { drawCalls: number }).drawCalls)).toBe(
    calls,
  )
  expect(errors).toEqual([])
  await page.screenshot({ path: 'test-results/desktop.png' })
})

test('eight circuits: autoplay, pause, previous, next, restart and finish', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await ready(page)
  await page.getByRole('button', { name: 'Trasee', exact: true }).click()
  await expect(page.locator('.pathway-row')).toHaveCount(8)
  await page.getByRole('button', { name: /01 Vedere/ }).click()
  await expect(page.locator('.player-status')).toContainText('Pasul 1 din 3')
  await expect(page.locator('.player-status')).toContainText('Pasul 2 din 3', { timeout: 4000 })
  await page.getByRole('button', { name: 'Pauză', exact: true }).click()
  const paused = await page.locator('.current-step h3').textContent()
  await page.waitForTimeout(1800)
  expect(await page.locator('.current-step h3').textContent()).toBe(paused)
  await page.getByRole('button', { name: 'Pasul anterior', exact: true }).click()
  await expect(page.locator('.player-status')).toContainText('Pasul 1 din 3')
  await page.getByRole('button', { name: 'Pasul următor', exact: true }).click()
  await expect(page.locator('.player-status')).toContainText('Pasul 2 din 3')
  await page.getByRole('button', { name: 'Repornește traseul', exact: true }).click()
  await expect(page.locator('.player-status')).toContainText('Pasul 1 din 3')
  await expect(page.getByText('Explorare încheiată')).toBeVisible({ timeout: 6500 })
  await page.getByRole('button', { name: 'Redă traseul', exact: true }).click()
  await expect(page.locator('.player-status')).toContainText('Pasul 1 din 3')
  await page.getByRole('button', { name: 'Toate traseele', exact: true }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const name of [
    'Auz',
    'Atingere și propriocepție',
    'Mișcare voluntară',
    'Miros',
    'Răspuns la amenințare',
    'Memorie',
    'Recompensă și motivație',
  ]) {
    await page.locator('.pathway-row').filter({ hasText: name }).click()
    await expect(page.locator('.path-title h2')).toHaveText(name)
    await expect(page.locator('.player-status')).toContainText('În pauză')
    await page.getByRole('button', { name: 'Pasul următor', exact: true }).click()
    await expect(page.locator('.player-status')).toContainText('Pasul 2')
    await page.getByRole('button', { name: 'Toate traseele', exact: true }).click()
  }
  expect(errors).toEqual([])
})

for (const [width, height] of [
  [360, 640],
  [390, 844],
  [430, 932],
]) {
  test(`mobile ${width}×${height}: no overflow, touch rotation/pinch, search and sources`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height },
      isMobile: true,
      hasTouch: true,
      reducedMotion: 'reduce',
      deviceScaleFactor: 1,
    })
    const page = await context.newPage(),
      errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })
    await ready(page)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.screenshot({ path: `test-results/mobile-${width}.png` })
    const canvas = page.locator('canvas'),
      b = (await canvas.boundingBox())!,
      x = b.x + b.width * 0.48,
      y = b.y + b.height * 0.55
    const initial = hash(await canvas.screenshot())
    const session = await context.newCDPSession(page)
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x, y, id: 1 }],
    })
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: x + 55, y: y + 12, id: 1 }],
    })
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await page.waitForTimeout(300)
    expect(hash(await canvas.screenshot())).not.toBe(initial)
    expect(await page.evaluate(() => scrollY)).toBe(0)
    const rotated = hash(await canvas.screenshot())
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [
        { x: x - 20, y, id: 1 },
        { x: x + 20, y, id: 2 },
      ],
    })
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [
        { x: x - 45, y, id: 1 },
        { x: x + 45, y, id: 2 },
      ],
    })
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await page.waitForTimeout(300)
    expect(hash(await canvas.screenshot())).not.toBe(rotated)
    await page.getByRole('button', { name: 'Resetează vederea', exact: true }).tap()
    const handle = page.locator('.sheet-handle'),
      hb = (await handle.boundingBox())!,
      hx = hb.x + hb.width / 2,
      hy = hb.y + hb.height / 2
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: hx, y: hy, id: 1 }],
    })
    // Paced like a finger; instantaneous moves read as a fling that swallows the next tap.
    for (let dy = 10; dy <= 260; dy += 10) {
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: hx, y: hy - dy, id: 1 }],
      })
      await page.waitForTimeout(16)
    }
    await page.waitForTimeout(120)
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await expect(handle).toHaveAttribute('aria-expanded', 'true')
    await handle.tap()
    await expect(handle).toHaveAttribute('aria-expanded', 'false')
    await page.getByRole('textbox', { name: 'Caută o structură' }).fill('amigdala')
    await expect(page.locator('.region-row')).toHaveCount(1)
    await page.locator('.region-row').tap()
    await expect(page.getByRole('heading', { name: 'Amigdală', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Restrânge panoul' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(await page.evaluate(() => scrollY)).toBe(0)
    await page.screenshot({ path: `test-results/mobile-deep-${width}.png` })
    await page.getByRole('button', { name: 'Meniu', exact: true }).tap()
    await page.getByRole('button', { name: /Despre proiect și surse/ }).tap()
    await expect(page.getByRole('dialog', { name: 'Despre proiect' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Surse și licențe' })).toBeVisible()
    await page.getByRole('button', { name: 'Închide despre proiect' }).tap()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    expect(errors).toEqual([])
    await context.close()
  })
}

test('menu navigation, reading guide, focus return and layer switch', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  await ready(page)
  const menuButton = page.getByRole('button', { name: 'Meniu', exact: true })
  await menuButton.click()
  const menu = page.getByRole('dialog', { name: 'Meniu' })
  await expect(menu).toBeVisible()
  await menu.getByRole('button', { name: /Trasee/ }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('.pathway-row')).toHaveCount(8)
  await expect(menuButton).toBeFocused()
  await menuButton.click()
  await page.getByRole('button', { name: /Cum citești modelul/ }).click()
  const about = page.getByRole('dialog', { name: 'Despre proiect' })
  await expect(about.getByRole('heading', { name: 'Cum citești modelul' })).toBeInViewport()
  await expect(about.locator('.legend li')).toHaveCount(4)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(menuButton).toBeFocused()
  const deep = page.getByRole('button', { name: 'Structuri profunde', exact: true })
  await deep.click()
  await expect(deep).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('button', { name: 'Exterior', exact: true })).toHaveAttribute(
    'aria-pressed',
    'false',
  )
  expect(errors).toEqual([])
})

test('model request failure is recoverable and content remains available', async ({ page }) => {
  await page.route('**/models/brain.glb', (route) => route.abort())
  await page.goto('/')
  await expect(page.getByText('Modelul 3D nu a putut fi încărcat.')).toBeVisible()
  await page.getByRole('button', { name: /Lob frontal Cortex cerebral/ }).click()
  await expect(page.getByRole('heading', { name: 'Lob frontal', exact: true })).toBeVisible()
  await page.unroute('**/models/brain.glb')
  await page.getByRole('button', { name: 'Reîncearcă', exact: true }).click()
  await expect(page.locator('canvas')).toBeVisible()
  await expect(page.getByText('Se încarcă modelul 3D…')).toBeHidden({ timeout: 20000 })
})

test('no WebGL fallback and reduced-motion playback', async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type.startsWith('webgl')) return null
      return getContext.apply(this, [type, ...args] as Parameters<typeof getContext>)
    } as typeof getContext
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByText('Vizualizarea 3D necesită WebGL 2.')).toBeVisible()
  await page.getByRole('button', { name: 'Trasee', exact: true }).click()
  await page.getByRole('button', { name: /01 Vedere/ }).click()
  await expect(page.locator('.player-status')).toContainText('În pauză')
  await page.waitForTimeout(1800)
  await expect(page.locator('.player-status')).toContainText('Pasul 1 din 3')
  await page.getByRole('button', { name: 'Pasul următor', exact: true }).click()
  await expect(page.locator('.player-status')).toContainText('Pasul 2 din 3')
})

test('loading indicator, context recovery, keyboard dialog and zoomed layout', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route('**/models/brain.glb', async (route) => {
    await gate
    await route.continue()
  })
  await page.goto('/')
  await expect(page.getByText('Se încarcă modelul 3D…')).toBeVisible()
  release()
  await expect(page.getByText('Se încarcă modelul 3D…')).toBeHidden({ timeout: 20000 })
  await page.getByRole('button', { name: 'Despre proiect și surse' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Despre proiect și surse' })).toBeFocused()
  await page
    .locator('canvas')
    .evaluate((canvas) => canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })))
  await expect(page.getByText('Vizualizarea 3D a fost întreruptă.')).toBeVisible()
  await page.getByRole('button', { name: 'Reîncearcă', exact: true }).click()
  await expect(page.locator('canvas')).toBeVisible()
  await page.evaluate(() => {
    document.documentElement.style.zoom = '200%'
  })
  await expect(page.getByRole('button', { name: 'Trasee', exact: true })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
