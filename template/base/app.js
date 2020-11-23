// ℹ️ To get access to environment
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connect to the database
require("./db");

// node js framework for handling http requests
// https://www.npmjs.com/package/express
const express = require("express");
// we need to install it in order to use handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "{{name}}";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with IronGenerator`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

// ❗ To handle errors. Routes that dont exist or errors that you handle in specfic routes
require("./error-handling")(app);

module.exports = app;
