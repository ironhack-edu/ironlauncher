module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  req.user = req.session.user;
  next();
};
