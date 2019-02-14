const cheerio = require('cheerio');
const axios = require('axios');
// const db = require('../models');

const mongojs = require('mongojs');
const mongodb_url = process.env.MONGODB_URI || 'mongodb://localhost/headline_news';

var collections = ['scrapedData'];
var db = mongojs(mongodb_url, collections);
db.on('error', error => console.log('Database Error: ', error));

module.exports = (app) => {

    app.get('/all', function (req, res) {
        db.scrapedData.find({}, function (error, found) {
            if (error) throw error;
            res.json(found);
        });
    });

    app.get('/scrape', function (req, res) {
        axios.get('https://news.ycombinator.com/').then(response => {

            var $ = cheerio.load(response.data);

            // TODO: map, then bulk (merge) upsert all.
            $('.title').each(function (i, element) {
                let a = $(element).children('a');
                let title = a.text();
                let link = a.attr('href');

                if (title && link) {
                    //TODO: upsert the data, preventing dups
                    db.scrapedData.insert({
                            title: title,
                            link: link,
                        },
                        (error, inserted) => {
                            if (error) throw error;
                            console.log(inserted);
                        }
                    );
                }
            });
        });
        res.send('Scrape Complete');
    });
}