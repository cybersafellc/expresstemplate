const ResponseError = require("../utils/ResponseError");
const logger = require("../config/logging");

class ErrorMiddleware {
  static async notFound(req, res, next) {
    try {
      throw new ResponseError(404, "page not found", null);
    } catch (error) {
      next(error);
    }
  }
  static handle(err, req, res, next) {
    logger.error(err.message, { stack: err.stack });

    // ✅ ERROR RESMI APLIKASI
    if (err instanceof ResponseError) {
      if (req.headers.accept?.includes("application/json")) {
        return res
          .status(err.status)
          .json({
            status: err.status,
            message: err.message,
            data: null,
            reference: err.reference,
            error: true,
          })
          .end();
      }

      return res.status(err.status).render("errors/error", {
        status: err.status,
        title: `${err.status} - ${err.message}`,
        errors: Array.isArray(err.reference) ? err.reference : [err.message],
        old: req.body || {},
      });
    }

    // ❌ ERROR TIDAK DIKENAL (BUG)
    if (req.headers.accept?.includes("application/json")) {
      return res
        .status(500)
        .json({
          status: 500,
          message: "Internal Server Error",
          data: null,
          reference: null,
          error: true,
        })
        .end();
    }
    return res.status(500).render("errors/error", {
      status: 500,
      title: `${500} - Internal Server Error`,
      errors: "Internal Server Error",
      old: req.body || {},
    });
  }
}

module.exports = ErrorMiddleware;
