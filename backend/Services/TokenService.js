const jwt = require("jsonwebtoken"),
  tokenModel = require("../Models/Token");
require("dotenv").config();

class TokenService {
  generateTokens(payload) {
    // console.log(`TService Payload: ${JSON.stringify(payload)}`);
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  saveToken = async (userID, refreshToken) => {
    const tokenData = await tokenModel.findOne({ user: userID });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userID, refreshToken });
    return token;
  };

  removeToken = async (refreshToken) => {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  };

  findToken = async (refreshToken) => {
    const tokenData = await tokenModel.findOne({ refreshToken });

    if (tokenData) console.log(`Token Found ${tokenData}`);
    return tokenData;
  };

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH);
      if (userData) console.log(`Token Refreshed ${JSON.stringify(userData)}`);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
