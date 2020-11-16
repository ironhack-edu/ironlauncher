const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const path = require("path");

// Middleware Setup

module.exports = (app) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Express View engine setup

  app.use(
    require("node-sass-middleware")({
      src: path.join(__dirname, "..", "public"),
      dest: path.join(__dirname, "..", "public"),
      sourceMap: true,
    })
  );

  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(
    favicon(path.join(__dirname, "..", "public", "images", "favicon.ico"))
  );
};
