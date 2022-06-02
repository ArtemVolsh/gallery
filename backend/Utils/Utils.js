const User = require("../Models/User");

async function findUser() {
  try {
    const response = await User.findById("6282e5677e4cb1ea471bd92f");

    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

module.exports = findUser;
