const puppeteer = require('puppeteer');

(async function getBunnies() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://nh.craigslist.org/search/sss?query=bunnies&sort=rel&haspic=1';
  await page.goto(url);
  await page.waitForSelector('.result-row');
  const results = await page.$$eval('.result-row', rows => {
    return rows.map(row => {
    
      const properties = {};
      const titleElement = row.querySelector('.result-title');
      properties.title = titleElement.innerText;
      properties.url = titleElement.getAttribute('href');
      const priceElement = row.querySelector('.result-price');
      properties.price = priceElement ? priceElement.innerText : '';
      const imageEl = row.querySelector('.swipe [data-index="0"] img');
      properties.imageUrl = imageEl ? imageEl.src : '';
      return properties;
    });
  }
   



  );

  browser.close();
  return { url, results };
})();

// exports.getBunnies = async function (req, res) {
//   return res.status(200).send(await getBunnies())
// }