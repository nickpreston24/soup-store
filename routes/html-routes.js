const site_name = 'The Soup Store';
const bugs_url = "https://github.com/MikePreston17/soup-store/issues";
const description = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione et praesentium porro aspernatur unde expedita
    quod atque dolor sed placeat, nisi a deserunt est. Quia suscipit sapiente libero. Possimus, obcaecati?
`;
const db = require('../models');

module.exports = (app) => {

    app.get('/', (req, res) => {
        //todo: axios here:

        db.Article.find({}, function (error, found) {
            if (error) throw error;
            console.log('found', found);
            // res.json(found);
            // let articles = undefined;
            res.render('index', {
                title: 'Soup Store',
                site_name,
                articles: found
            })
        });
        //todo end

    });

    app.get('/about', (req, res) => res.render('about', {
        title: 'About Page',
        description,
        site_name
    }));

    app.get('/error404', (req, res) => res.render('error404', {
        title: 'Soup Spill!',
        site_name,
        bugs_url
    }))
}