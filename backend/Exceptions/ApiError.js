class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  UnauthorizedError(status = 401, error = "Unauthorized User") {
    return new ApiError(status, error);
  }

  BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}

module.exports = new ApiError();
