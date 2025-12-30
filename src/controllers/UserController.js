const UserService = require("../services/UserService");
const Response = require("../utils/response.util");

class UserController {
  constructor() {
    this.service = new UserService();

    this.create = this.create.bind(this);
    this.store = this.store.bind(this);
  }

  async create(req, res, next) {
    try {
      res.render("users/create", {
        title: "Create User",
        errors: null,
        old: {},
      });
    } catch (err) {
      next(err);
    }
  }

  async store(req, res, next) {
    try {
      const user = await this.service.create(req.body);

      return Response.success(res, {
        status: 201,
        message: "User created",
        data: user,
        reference: "USER_CREATE",
      });
    } catch (err) {
      next(err); // ⬅️ WAJIB
    }
  }
}

module.exports = UserController;
