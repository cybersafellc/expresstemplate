class Response {
  static success(
    res,
    { status = 200, message = "Success", data = null, reference = null } = {}
  ) {
    return res
      .status(status)
      .json({
        status,
        message,
        data,
        reference,
        error: false,
      })
      .end();
  }
}

module.exports = Response;
