const ResponseError = require("../utils/ResponseError");

class ValidateMiddleware {
  static use(source, schema) {
    return (req, res, next) => {
      const data = req[source];

      if (!data) {
        throw new ResponseError(400, `Request ${source} is required`);
      }

      const { error, value } = schema.validate(data, {
        abortEarly: false,
      });

      if (error) {
        throw new ResponseError(
          422,
          "Validation Error",
          error.details.map((d) => d.message)
        );
      }

      req[source] = value;
      next();
    };
  }

  static body(schema) {
    return this.use("body", schema);
  }

  static query(schema) {
    return this.use("query", schema);
  }

  static params(schema) {
    return this.use("params", schema);
  }
}

module.exports = ValidateMiddleware;
