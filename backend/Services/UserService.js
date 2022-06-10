const ApiError = require("../Exceptions/ApiError");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDTO = require("../DTOs/UserDTO");
const TokenService = require("./TokenService");
const MailService = require("./MailService");
const Role = require("../Models/Role");

class UserService {
  registration = async (email, password, phoneNumber) => {
    const candidate = await User.findOne({ email });

    if (candidate) console.log(`User with this email: ${email} already exists`);

    const hashPassword = await bcrypt.hash(password, 3),
      activationLink = uuid.v4();

    const userRole = await Role.findOne({ value: "USER" });

    console.log(`User role: ${userRole.value}`);

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
      phoneNumber,
      role: userRole.value,
    });

    // await MailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/v1/authentication/activate/${activationLink}`
    // );

    const userDTO = new UserDTO(user);

    const tokens = TokenService.generateTokens({ ...userDTO });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  };
  activate = async () => {};

  logout = async (refreshToken) => {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  };

  login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "Wrong email, password combination",
      };
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      return {
        success: false,
        message: "Wrong email, password combination",
      };
    }
    const userDto = new UserDTO(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    console.log("User service Login: " + JSON.stringify(userDto, tokens));
    return { ...tokens, user: userDto };
  };

  logout = async (refreshToken) => {
    const token = await TokenService.removeToken(refreshToken);

    return token;
  };

  refresh = async (refreshToken) => {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  };

  getUserById = async (id) => {
    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        message: "Can't find the user",
      };
    }
    const userDto = new UserDTO(user);

    return { user: userDto };
  };
}

module.exports = new UserService();
