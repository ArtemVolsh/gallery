import axios from "axios";
import { setAdmin, setUser } from "../Reducers/userReducer";

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

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        email,
        password,
      });

      console.log(`Login Req: ${response}`);

      if (response.data.user.role.includes("ADMIN")) {
        dispatch(setAdmin(response.data.user));
      } else {
        dispatch(setUser(response.data.user));
      }

    } catch (e) {
      console.log("Login Api Error" + e);
    }
  };
};

export const createExhibition = async (exhibition) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/exhibitions`, {
      exhibition,
    });

    if (response.status(200) || response.status(201)) {
      return {
        success: true,
        message: "Exhibition created!",
      };
    } else {
      console.log("Bad!");
      return {
        success: false,
        message: "Exhibition creation failed!",
        responseMessage: response?.message,
      };
    }
  } catch (e) {
    console.log(JSON.stringify(e));
    console.log(e.response.data);
  }
};

export const createExcursion = async (excursion) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/excursions`, {
      excursion,
    });

    if (response.status(200) || response.status(201)) {
      return {
        success: true,
        message: "Excursion created!",
      };
    } else {
      console.log("Bad!");
      return {
        success: false,
        message: "Excursion creation failed!",
        responseMessage: response?.message,
      };
    }
  } catch (e) {
    console.log(JSON.stringify(e));
    console.log(e.response.data);
  }
};