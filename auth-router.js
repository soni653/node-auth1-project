const express = require("express");
const Users = require("./users/users-model");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/api/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username });

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    const newUser = await Users.add({
      username,
      // hash the password with a time complexity of "11"
      password: await bcrypt.hash(password, 11),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/api/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username });

    // hash the password again and see if it matches what we have in the database
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // generate a new session for this user,
    // and sends back a session ID
    req.session.user = user;

    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
