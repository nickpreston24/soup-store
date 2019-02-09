const express = require('express');
const cheerio = require('cheerio');
const mongojs = require('mongojs');
const axios = require('axios');

const PORT = 8080;

var app = express();

var dbUrl = 'scraper';
var collections = ["scrapedData"];

var db = mongojs(dbUrl, collections);

db.on('error', error => console.log("Database Error: ", error))

app.get("/", (req, res) => res.send(`What do you mean you're "at soup"?`));

app.get('/all', function (req, res) {

    db.scrapedData.find({}, function (error, found) {
        if (error) throw error;
        res.json(found);
    })

})

app.get("/scrape", function (req, res) {
    axios.get("https://news.ycombinator.com/")
        .then(response => {
            var t0 = performance.now();
            var $ = cheerio.load(response.data);

            // TODO: map to collection of titles & links, then insert all.
            $(".title").each(function (i, element) {

                let a = $(element).children("a")
                let title = a.text();
                let link = a.attr("href");

                if (title && link) {
                    //TODO: upsert the data, preventing dups
                    db.scrapedData.insert({
                            title: title,
                            link: link
                        },
                        (error, inserted) => {
                            if (error) throw error;
                            // console.log(inserted);
                        });
                }
            })

            console.log("took ", performance.now() - t0, " ms.")
        })
    res.send("Scrape Complete");
})


app.listen(PORT, () => console.log('Listening on port ' + PORT));