const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = 'https://www.reddit.com';

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    const $ = cheerio.load(html);
    $('h2').each(function() {
      console.log($(this).text());
    });
  })
  .catch(function(err) {
    //handle error
  });