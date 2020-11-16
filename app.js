require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");

const app = express();
require("./config")(app);
// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
