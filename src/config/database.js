const { PrismaClient } = require("@prisma/client");
const logger = require("./logging");

class Database {
  constructor() {
    this.prisma = new PrismaClient({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
      ],
    });

    this.registerEvents();
  }

  registerEvents() {
    this.prisma.$on("query", (e) => {
      logger.info("Prisma Query", {
        query: e.query,
        params: e.params,
        duration: `${e.duration}ms`,
      });
    });

    this.prisma.$on("error", (e) => {
      logger.error("Prisma Error", e);
    });

    this.prisma.$on("warn", (e) => {
      logger.warn("Prisma Warning", e);
    });

    this.prisma.$on("info", (e) => {
      logger.info("Prisma Info", e);
    });
  }

  getClient() {
    return this.prisma;
  }
}

module.exports = new Database().getClient();
