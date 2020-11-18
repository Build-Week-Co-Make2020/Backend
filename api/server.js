const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("../auth/auth-router.js");
const postRouter = require("../Posts/post-router.js");
// const restricted = require("../auth/auth-middleware");

const server = express();
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "api is running" });
});

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

server.post("/:id", (req, res) => {
  request(
    { url: "https://bd-comake.herokuapp.com/api/posts/:id" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

server.use("/api/auth", authRouter);
server.use("/api/posts", postRouter);

module.exports = server;
