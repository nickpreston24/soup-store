const cheerio = require('cheerio');
const axios = require('axios');
const db = require('../models');
const mongoose = require('mongoose');

const mongodb_url = process.env.MONGODB_URI || 'mongodb://localhost/headline_news';
console.log('mongo url', mongodb_url);
mongoose.connect(mongodb_url, {
    useNewUrlParser: true
});

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

            let articles = [];
            $('.title').each(function (i, element) {
                let a = $(element).children('a');
                let title = a.text();
                let link = a.attr('href');

                if (title && link) {
                    articles.push({
                        title,
                        link
                    });
                }
            });

            db.Article.create(articles)
                .then(stored => console.info(stored))
                .catch(err => console.log(err.message));

            res.json(articles);
        });
    });
}