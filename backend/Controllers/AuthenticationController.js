const UserService = require("../Services/UserService");

class authenticationController {
  registration = async (req, res, next) => {
    try {
      const { email, password, username, phoneNumber } = req.body;

      const userData = await UserService.registration(
        email,
        password,
        username,
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
      const { email, password, username, phoneNumber } = req.body;
      const userData = await UserService.login(
        email,
        password,
        username,
        phoneNumber
      );
    } catch (error) {
			
		}
  };
}

module.exports = new authenticationController();
