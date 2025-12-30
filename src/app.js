const express = require("express");
const path = require("path");
const routes = require("./routes/web.route");
const errorHandler = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: helmet } = require("helmet");
const limiter = require("./config/limiter");
const requestIp = require("request-ip");
const crypto = require("crypto");

class App {
  constructor() {
    this.app = express();
    this.protection();
    this.config();
    this.routes();
    this.errors();
  }

  protection() {
    this.app.use((req, res, next) => {
      res.locals.nonce = crypto.randomBytes(16).toString("base64");
      next();
    });
    this.app.set("proxy trust", true);
    this.app.use(requestIp.mw());
    this.app.use(cors());
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
            styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
          },
        },
      })
    );
    this.app.use(limiter);
  }

  config() {
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
  }

  routes() {
    this.app.use(express.static("public"));
    this.app.use(routes);
  }

  errors() {
    this.app.use(errorHandler.notFound);
    this.app.use(errorHandler.handle);
  }

  getApp() {
    return this.app;
  }
}

module.exports = new App().getApp();
