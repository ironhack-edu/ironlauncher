// ℹ️ To get access to environment
require("dotenv").config();

// ℹ️ Connect to the database
require("./db");

const express = require("express");
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

const projectName = "{{name}}";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with IronGenerator`;
// default value for title local

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that dont exist or errors that you handle in specfic routes
require("./error-handling")(app);

module.exports = app;
