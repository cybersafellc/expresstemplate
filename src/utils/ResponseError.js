class ResponseError extends Error {
  constructor(status, message, reference = null) {
    super(message);
    this.status = status;
    this.reference = reference;
  }
}

module.exports = ResponseError;
