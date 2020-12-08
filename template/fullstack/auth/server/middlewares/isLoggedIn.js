const Session = require("../models/Session.model");

module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.headers.authorization || req.headers.authorization === "null") {
    return res.status(403).json({ errorMessage: "You are not logged in" });
  }

  Session.findById(req.headers.authorization)
    .populate({ path: "user", model: "User" })
    .then((session) => {
      if (!session) {
        return res
          .status(404)
          .json({ errorMessage: "No session started for this user" });
      }
      // makes the user available in `req.user` from now onwards
      req.user = session.userId;
      next();
    })
    .catch((err) => {
      return res.status(500).json({ errorMessage: err.message });
    });
};
