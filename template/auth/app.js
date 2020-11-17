// ℹ️ To get access to environment
require('dotenv').config();

// ℹ️ Connect to the database
require('./db');

const express = require('express');
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/auth', auth);

// ❗ To handle errors. Routes that dont exist or errors that you handle in specfic routes
require('./error-handling')(app);

module.exports = app;
