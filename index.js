// TODO: Meter array URLs para procesar mas de una URL por vendor
// TODO: Agregar Amazon, Mediamarkt, Fnac, CorteIngles AAAmmmm
// Amazon:
// https://www.amazon.es/LG-OLED55CX3LA-TELEVISOR-4K/dp/B08H5G6732
// https://www.amazon.es/LG-OLED55CX-ALEXA-Inteligencia-Artificial-Inteligente/dp/B086J31MRW
// https://www.amazon.es/LG-TV-OLED-55CX6-UHD/dp/B086DCSC3P
// Fnac:
// https://www.fnac.es/TV-OLED-55-LG-OLED55CX-4K-UHD-HDR-Smart-TV-TV-TV-OLED/a7365549
// https://www.fnac.es/TV-OLED-55-LG-OLED55CX3-4K-UHD-HDR-Smart-TV-TV-TV-OLED/a7872041
// https://www.fnac.es/mp8979831/TV-OLED-55-LG-55CX6-4K-UHD-Smart-TV-negro/w-4
// CorteIngles:
// https://www.elcorteingles.es/electronica/A39624761-tv-oled-1388-cm-55-lg-oled55cx6la-4k-inteligencia-artificial-hdr-dolby-vision-reacondicionado-a-estrenar/
// https://www.elcorteingles.es/electronica/A35445416-tv-oled-1388-cm-55-lg-oled55cx6la-4k-con-inteligencia-artificial-hdr-dolby-vision-iq-y-smart-tv/
// Worten:
// https://www.worten.es/productos/tv-video-y-sonido/televisores/oled/tv-lg-oled55cx5-oled-55-140-cm-4k-ultra-hd-smart-tv-7151225
// Mediamarkt: parece que no tienen ficha de la TV
// Ebay,es
// https://www.ebay.es/itm/234174767693?hash=item3685e7624d:g:bVwAAOSwYmhhNfoo
const { chromium } = require('playwright')
const maximumPrice = 1090
const shops = [
  {
    vendor: 'PcComponentes',
    url: 'https://www.pccomponentes.com/lg-oled55cx3la-55-oled-ultrahd-4k',
    checkStock: async ({ page }) => {
      await page.click('button.accept-cookie')
      const notifyMeButton = await page.$$('.notify-me')
      return !notifyMeButton.length > 0 // Si no hay NotifyMeButton y el precio es inferior a 1100€, entonces hay stock
    },
    checkPrice: async ({ page }) => {
      const price = await page.textContent('.baseprice')
      return price <= maximumPrice
    },
    getPrice: async ({ page }) => {
      return await page.textContent('.baseprice')
    }
  },
  {
    vendor: 'Amazon1',
    url: 'https://www.amazon.es/LG-OLED55CX3LA-TELEVISOR-4K/dp/B08H5G6732',
    checkStock: async ({ page }) => {
      await page.click('#sp-cc-accept')
      const addToCartButton = await page.$$('#add-to-cart-button')
      return addToCartButton.length > 0 // Si hay add to cart button, entonces hay stock
    },
    checkPrice: async ({ page }) => {
      const price = await page.textContent(
        'span.a-price.a-text-price span.a-offscreen >> nth=0'
      )
      return price <= maximumPrice
    },
    getPrice: async ({ page }) => {
      return await page.textContent(
        'span.a-price.a-text-price span.a-offscreen >> nth=0'
      )
    }
  },
  {
    vendor: 'Amazon2',
    url: 'https://www.amazon.es/LG-OLED55CX-ALEXA-Inteligencia-Artificial-Inteligente/dp/B086J31MRW',
    checkStock: async ({ page }) => {
      await page.click('#sp-cc-accept')
      const addToCartButton = await page.$$('#add-to-cart-button')
      return addToCartButton.length > 0 // Si hay add to cart button, entonces hay stock
    },
    checkPrice: async ({ page }) => {
      const price = await page.textContent(
        'span.a-price.a-text-price span.a-offscreen >> nth=0'
      )
      if (price.length > 0) return price <= maximumPrice
      else return false
    },
    getPrice: async ({ page }) => {
      const valuePrice = await page.textContent(
        'span.a-price.a-text-price span.a-offscreen >> nth=0'
      )
      if (valuePrice.length > 0) return valuePrice
      else return 'No hay precio'
    }
  },
  {
    vendor: 'Amazon3',
    url: 'https://www.amazon.es/LG-TV-OLED-55CX6-UHD/dp/B086DCSC3P',
    checkStock: async ({ page }) => {
      await page.click('#sp-cc-accept')
      const addToCartButton = await page.$$('#add-to-cart-button')
      return addToCartButton.length > 0 // Si hay add to cart button, entonces hay stock
    },
    checkPrice: async ({ page }) => {
      const price = await page.textContent(
        'span.a-price.a-text-price span.a-offscreen >> nth=0'
      )
      return price <= maximumPrice
    },
    getPrice: async ({ page }) => {
      return await page.textContent(
        'span.a-price.a-text-price span.a-offscreen >> nth=0'
      )
    }
  }
  // ,
  // {
  //   vendor: 'TESTPcComponentesConStock',
  //   url: 'https://www.pccomponentes.com/samsung-qe50q60aauxxh-50-qled-ultrahd-4k',
  //   checkStock: async ({ page }) => {
  //     const notifyMeButton = await page.$$('.notify-me')
  //     return (!notifyMeButton.length > 0) // Si no hay NotifyMeButton, entonces hay stock
  //   },
  //   checkPrice: async ({ page }) => {
  //     const price = await page.textContent('.baseprice')
  //     return (price <= maximumPrice)
  //   },
  //   getPrice: async ({ page }) => { return await page.textContent('.baseprice') }
  // }
];

(async () => {
  const browser = await chromium.launch({ headless: false })
  for (const shop of shops) {
    const { vendor, url, checkStock, checkPrice, getPrice } = shop

    const page = await browser.newPage()
    await page.goto(url)

    const hasStock = await checkStock({ page })

    if (hasStock) {
      const priceIsOk = await checkPrice({ page })
      const priceInWeb = await getPrice({ page })

      if (priceIsOk) {
        console.log(
          'Hay stock en ' + vendor + ' Precio OK!!!: ' + priceInWeb + '€'
        )
      } else {
        console.log(
          'Hay stock en ' +
            vendor +
            ' pero precio demasiado alto: ' +
            priceInWeb +
            '€'
        )
      }
    } else {
      console.log('No hay stock :( en ' + vendor)
    }
    await page.screenshot({ path: './screenshots/' + vendor + '.png' })
    await page.close()
  }
  await browser.close()
})()
