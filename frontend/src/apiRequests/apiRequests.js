import axios from "axios";

export const registration = async ({ email, password, phoneNumber }) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/registration`,
      {
        email,
        password,
        phoneNumber,
      }
    );

    let message;
    if (response.status(200) || response.status(201)) {
      message = "User is registered";
    } else {
      message = "Registration Error";
    }
    return message;
  } catch (e) {
    console.log(e);
    console.log(e.response?.data?.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/login`, {
      email,
      password,
    });

    if (response.data.user.roles.includes("ADMIN")) {
    } else if (response.data.user.roles.includes("USER")) {
    }
  } catch (e) {
    console.log(e);
  }
};
