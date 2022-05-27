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
      });

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
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new authenticationController();
