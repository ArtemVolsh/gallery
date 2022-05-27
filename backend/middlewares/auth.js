const ApiError = require("../Exceptions/ApiError");
const TokenService = require("../Services/TokenService");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) next(ApiError.UnauthorizedError());

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) next(ApiError.UnauthorizedError());

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) next(ApiError.UnauthorizedError());

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
