// script para fichar
const { chromium } = require("playwright");
const fs = require("fs");
const fileUserCredentials = "./user.json";
const defaultUsername = "11111111A";
const defaultPassword = "1111";
let userName = "";
let userPasword = "";

try {
  if (fs.existsSync(fileUserCredentials)) {
    const obj = JSON.parse(fs.readFileSync(fileUserCredentials, "utf8"));
    userName = obj.username;
    userPasword = obj.password;
  } else {
    userName = defaultUsername;
    userPasword = defaultPassword;
  }
} catch (err) {
  console.log(err);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({
    geolocation: { longitude: 41.411338, latitude: 2.197971 },
    permissions: ["geolocation"],
  });
  const page = await context.newPage();
  await page.goto("https://a3gt.wolterskluwer.es/gt#/clockings/57962");

  await page.type("#username", userName);
  await page.type("#pwd", userPasword);

  await page.click("#sendClocking");
  await page.waitForSelector("div.notice");

  await page.screenshot({ path: "./screenshots/fichar/" + "fichar.png" });

  await page.close();
  await browser.close();
})();
