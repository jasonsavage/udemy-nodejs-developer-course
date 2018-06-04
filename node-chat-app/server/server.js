const path = require('path');
const express = require('express');
const routes = require('./routes');

const publicPath = path.join(__dirname, '../public');

// setup express
const port = process.env.PORT || 3000;
var app = express();

/**
 * 
 * Middleware
 * 
 */

// add middleware to serve any file in the public folder
app.use( express.static(publicPath) );

/**
 * 
 * Setup routes
 * 
 */
routes(app);

 /**
 * 
 * Start server and listen for requests on {port}
 * 
 */
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});