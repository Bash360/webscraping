const puppeteer = require('puppeteer');

(async function getBunnies() { 
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = 'https://nh.craigslist.org/search/sss?query=bunnies&sort=rel&haspic=1';
  await page.goto(url);
  await page.waitForSelector('.result-row');
  const results = await page.$$eval('.result-row', rows => rows);
  console.log(results);
})();