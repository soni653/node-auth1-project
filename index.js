const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const restrict = require("./middleware/restrict");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const db = require("./database/config");
const userRouter = require("./users/users-router");
const server = express();
const port = process.env.PORT || 5050;
const authrouter = require("./auth-router");

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "Very secret secret",
    store: new knexSessionStore({
      knex: db,
      createtable: true,
    }),
  })
);

server.use(authrouter);
server.use(restrict(), userRouter);
server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
