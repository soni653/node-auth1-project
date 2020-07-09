const express = require("express");
const Users = require("./users-model");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/api/users", async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
