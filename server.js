const express = require('express');
const expbs = require('express-handlebars');
const path = require('path');

const PORT = 8080;
const layoutsDir = path.join(__dirname, 'views/mainLayouts'); //Doing this in case I forget how.
const partialsDir = path.join(__dirname, 'views/pieces');

var app = express();
app.engine('handlebars', expbs({
    defaultLayout: 'main',
    layoutsDir,
    partialsDir,
}));
app.set('view engine', 'handlebars');

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

app.listen(PORT, () => console.log('Listening on port ' + PORT));