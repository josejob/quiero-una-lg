// script para fichar
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    geolocation: { longitude: 41.411338, latitude: 2.197971 },
    permissions: ["geolocation"],
  });
  const page = await context.newPage();
  await page.goto("https://a3gt.wolterskluwer.es/gt#/clockings/57962");

  await page.type("#username", "47733826V");
  await page.type("#pwd", "1234");

  await page.click("#sendClocking");
  await page.waitForSelector("div.notice");

  await page.screenshot({ path: "./screenshots/fichar/" + "fichar.png" });

  await page.close();
  await browser.close();
})();
