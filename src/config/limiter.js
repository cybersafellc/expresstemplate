const Response = require("../utils/response.util");
const logging = require("./logging");
const rateLimit = require("express-rate-limit");

class Limiter {
  constructor({ request_per_minute }) {
    this.limiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: request_per_minute,
      standardHeaders: true,
      legacyHeaders: false,
      handler: async (req, res) => {
        logging.error(`SUCCESS BLOCKED FROM DDOS ATTACK (${req.clientIp})`);
        const status = 429;
        const messaage = "to many request";
        if (req.headers.accept?.includes("application/json")) {
          return res
            .status(status)
            .json({
              status: status,
              message: messaage,
              data: null,
              reference: null,
              error: true,
            })
            .end();
        }

        return res.status(status).render("errors/error", {
          status: status,
          title: `${status} - ${messaage}`,
          errors: messaage,
        });
      },
    });
  }

  getLimiter() {
    return this.limiter;
  }
}

module.exports = new Limiter({
  request_per_minute: 2000, // berapa request /menit bang
}).getLimiter();
