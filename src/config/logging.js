const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

class Logger {
  constructor() {
    this.logger = createLogger({
      level: "info",
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
      ),
      transports: this.transports(),
    });
  }

  transports() {
    return [
      new transports.Console(),

      new DailyRotateFile({
        filename: path.join("tmp", "combine-%DATE%.log"),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "500m",
        maxFiles: "15d",
      }),

      new DailyRotateFile({
        level: "error",
        filename: path.join("tmp", "error-%DATE%.log"),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "500m",
        maxFiles: "15d",
      }),
    ];
  }

  info(message, meta = {}) {
    this.logger.info(message, meta);
  }

  warn(message, meta = {}) {
    this.logger.warn(message, meta);
  }

  error(message, meta = {}) {
    this.logger.error(message, meta);
  }
}

module.exports = new Logger();
