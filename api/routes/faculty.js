const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "It is a faculty get request",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "It is a faculty post request",
  });
});

module.exports = router;
