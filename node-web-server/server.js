const path = require('path');
const express = require('express');
const fs = require('fs');

// setup express
const port = process.env.PORT || 3000;
var app = express();

// add plugin for rendering views
app.set('view engine', 'pug');

/**
 * 
 * Middleware
 * 
 */
// custom middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// custom middleware to check if in maintenance mode
app.use((req, res, next) => {
    res.render('maintenance');
});

// add middleware to serve any file in the public folder
app.use( express.static(path.join(__dirname, 'public')) );

/**
 * 
 * Setup routes
 * 
 */
app.get('/', (req, res) => {
    //res.send('<h1>Hello, Express!</h1>');
    // res.send({
    //     name: 'Andrew',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

// handle error
app.get('/bad', (req, res) => {
    res.send({
        error: 'request error'
    });
});

// Start server and listen for requests on {port}
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});