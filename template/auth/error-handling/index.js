module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404);
    res.render("not-found");
  });

  app.use((err, req, res, next) => {
    // always log the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500);
      res.render("error");
    }
  });
};
