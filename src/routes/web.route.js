const express = require("express");
const UserController = require("../controllers/UserController");
const Validate = require("../middlewares/validate.middleware");
const userValidation = require("../validations/user.validation");

class WebRoute {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
    this.init();
  }

  init() {
    this.router.get("/users/create", this.controller.create);
    this.router.post(
      "/users",
      Validate.body(userValidation.create()),
      this.controller.store
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new WebRoute().getRouter();
