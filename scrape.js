const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//  Write Headers
writeStream.write(`Item\n`);


request('https://codedemos.com/sampleblog/', (err, res, html) => {
    if(!err && res.statusCode == 200) {
        const $ = cheerio.load(html);

        const anchor = $('a');
        
        // console.log(anchor);
        // console.log(anchor.html());
        // console.log(anchor.text());

        // console.log(anchor.find('p').html());
        // console.log(anchor.children('span').text());
        // console.log(anchor.children('span').next().text());
        // console.log(anchor.children('p').parent().text());

        $('li a').each((i, el) => {
            const item = $(el).text();
            const link = $(el).attr('href');
            
            //  Write row to CSV
            writeStream.write(`${item}\n`);
        });
        console.log('Scraping Done...')
    }
});

// .replace(/\s\s+/g, '')       =>  Removes extra white space