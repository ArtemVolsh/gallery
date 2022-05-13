const ApiError = require("../Exceptions/ApiError");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDTO = require("../DTOs/UserDTO");
const TokenService = require("./TokenService");
const MailService = require("./MailService");
const Role = require("../Models/Role");

class UserService {
  registration = async (email, password, username, phoneNumber) => {
    const candidate = await User.findOne({ email });

    if (candidate) console.log(`User with this email: ${email} already exists`);

    const hashPassword = await bcrypt.hash(password, 3),
      activationLink = uuid.v4();

    const userRole = await Role.findOne({ value: "USER" });

    console.log(`User role: ${userRole.value}`);

    const user = await User.create({
      username,
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
    console.log(`UService tokens after signing ${JSON.stringify(tokens)}`);
    console.log(`UService DTO ${JSON.stringify(userDTO)}`);
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  };
  activate = async () => {};

  login = async (email, username, password) => {};
}

module.exports = new UserService();
