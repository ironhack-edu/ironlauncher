// We reuse this import in order to have access to the `body` property in requests
const express = require("express");
// ℹ️ Reponsible for the messages you in the terminal as requests are coming in
const logger = require("morgan");

// ℹ️ If we deal with cookies (we will when dealing with auth)
const cookieParser = require("cookie-parser");
// ℹ️ In order to serve a custom favicon on each request
const favicon = require("serve-favicon");

// ℹ️ global package used to `normalize` paths amongst different operating systems
const path = require("path");

// Middleware configuration
module.exports = (app) => {
  // in development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // On request it tries to recompile the scss file into a regular css file. If you dont want to use scss, you can remove this middleware

  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"));
  // sets the view engine to handlebars
  app.set("view engine", "hbs");
  // access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")));

  // access to the favicon
  app.use(
    favicon(path.join(__dirname, "..", "public", "images", "favicon.ico"))
  );
};
