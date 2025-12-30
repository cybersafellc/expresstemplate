const ResponseError = require("../utils/ResponseError");

class UserService {
  async create(data) {
    if (data.email === "admin@mail.com") {
      throw new ResponseError(400, "Email not allowed");
    }

    return {
      id: Date.now(),
      ...data,
    };
  }
}

module.exports = UserService;
