const rp = require('request-promise');
const cheerio = require('cheerio');

const potusParse = function(url) {
    return rp(url)
        .then((html) => {
            const $ = cheerio.load(html);
            return {
                name: $('.firstHeading').text(),
                birthDate: $('.bday').text().slice(0, 10)
            };
        })
        .catch((err) => {
            //handle error
        });
}

module.exports = potusParse;