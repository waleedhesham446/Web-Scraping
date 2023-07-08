const rp = require('request-promise');
const cheerio = require('cheerio');

const potusParse = require('./potusParse.js')

let url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
    .then((html) => {
        //success!
        const $ = cheerio.load(html);
        const wikiURLs = [];
        
        // console.log($('.mw-parser-output table.wikitable tbody tr td b > a').length);
        // console.log($('.mw-parser-output table.wikitable tbody tr td b > a'));

        $('.mw-parser-output table.wikitable tbody tr td b > a').each((i, url) => {
            wikiURLs.push($(url).attr('href'));
        });

        url = 'https://en.wikipedia.org';

        return Promise.all(
            wikiURLs.map((link) => {
                return potusParse(url+link);
            })
        );
    })
    .then((usPresedints) => {
        console.log(usPresedints);
    })
    .catch((err) => {
        //handle error
        console.log(err);
    });