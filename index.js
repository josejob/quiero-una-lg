// TODO: Volver a configurar Eslint y pretifier
// TODO: Agregar Amazon, Mediamarkt, Fnac, CorteIngles
const { chromium } = require('playwright')
const maximumPrice = 599
const shops = [
  {
    vendor: 'PcComponentes',
    url: 'https://www.pccomponentes.com/lg-oled55cx3la-55-oled-ultrahd-4k',
    checkStock: async ({ page }) => {
      const notifyMeButton = await page.$$('.notify-me')
      return (!notifyMeButton.length > 0) // Si no hay NotifyMeButton y el precio es inferior a 1100€, entonces hay stock
    },
    checkPrice: async ({ page }) => {
      const price = await page.textContent('.baseprice')
      return (price <= maximumPrice)
    },
    getPrice: async ({ page }) => { return await page.textContent('.baseprice') }
  },
  {
    vendor: 'TESTPcComponentesConStock',
    url: 'https://www.pccomponentes.com/samsung-qe50q60aauxxh-50-qled-ultrahd-4k',
    checkStock: async ({ page }) => {
      const notifyMeButton = await page.$$('.notify-me')
      return (!notifyMeButton.length > 0) // Si no hay NotifyMeButton, entonces hay stock
    },
    checkPrice: async ({ page }) => {
      const price = await page.textContent('.baseprice')
      return (price <= maximumPrice)
    },
    getPrice: async ({ page }) => { return await page.textContent('.baseprice') }
  }
]

;(async () => {
  const browser = await chromium.launch({ headless: false })
  for (const shop of shops) {
    const { vendor, url, checkStock, checkPrice, getPrice } = shop

    const page = await browser.newPage()
    await page.goto(url)
    await page.screenshot({ path: './screenshots/' + vendor + '.png' })

    const hasStock = await checkStock({ page })
    const priceIsOk = await checkPrice({ page })
    const price = await getPrice({ page })

    if (hasStock) {
      if (priceIsOk) console.log('Hay stock en ' + vendor + ' Precio OK!!!: ' + price + '€')
      else console.log('Hay stock en ' + vendor + ' pero precio demasiado alto: ' + price + '€')
    } else { console.log('No hay stock :( en ' + vendor + ' Precio: ' + price + '€') }
  }
  await browser.close()
})()
