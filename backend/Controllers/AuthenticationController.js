const User = require("../Models/User");
const UserService = require("../Services/UserService");

class authenticationController {
  registration = async (req, res, next) => {
    try {
      const { email, password, phoneNumber } = req.body;

      const userData = await UserService.registration(
        email,
        password,
        phoneNumber
      );

      // localStorage.setItem("refreshToken", userData.refreshToken); autoDelete function needed

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
        sameSite: "Lax",
        secure: true,
      });

      return res.json(userData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userData = await UserService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
        sameSite: "Lax",
        secure: true,
      });

      console.log(res.cookies);
      console.log(res.cookies);

      return res.json(userData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);

      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Lax",
        secure: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { id } = req.body;

      const user = await UserService.getUserById(id);

      return res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = new authenticationController();
