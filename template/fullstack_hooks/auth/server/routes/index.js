const router = require("express").Router();
const authRoutes = require("./auth");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

module.exports = router;
