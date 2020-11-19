module.exports = (app) => {
  app.use((req, res, next) => {
    // this app.use runs whenever no request is delivers a response
    res.status(404);
    res.render("not-found");
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err) this is the middleware will handle the error
    // always log the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500);
      res.render("error");
    }
  });
};
