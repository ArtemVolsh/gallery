import axios from "axios";
import { setAdmin, setUser } from "../Reducers/userReducer";
const { log } = console;

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
    log(e);
    log(e.response?.data?.message);
  }
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        email,
        password,
      });

      log(`Login Req: ${response}`);

      if (response.data.user.role.includes("ADMIN")) {
        dispatch(setAdmin(response.data.user));
      } else {
        dispatch(setUser(response.data.user));
      }
    } catch (e) {
      log("Login Api Error" + e);
    }
  };
};

export const createExhibition = async (exhibition) => {
  try {
    axios
      .post(`http://localhost:5000/api/exhibitions`, {
        exhibition,
      })
      .then((response) => {
        log("Exh Create Log");
        log(response);
        const controllerResponse = {
          ...response,
          controllerSuccess: true,
          controllerMessage: "Exhibition created!",
        };
        log("Exh Create Log 2");
        log(controllerResponse);

        return controllerResponse;
      })
      .catch((e) => {
        const controllerError = {
          ...e,
          controllerSuccess: false,
          controllerMessage: "Exhibition creation failed!",
        };
        return controllerError;
      });
  } catch (e) {
    log(JSON.stringify(e));
    log(e?.response?.data);
  }
};

export const createExcursion = async (excursion) => {
  try {
    axios
      .post(`http://localhost:5000/api/excursions`, {
        excursion,
      })
      .then((response) => {
        log("Exc Create Log");
        log(response);
        const controllerResponse = {
          ...response,
          controllerSuccess: true,
          controllerMessage: "Excursion created!",
        };
        log("Exc Create Log 2");
        log(controllerResponse);

        return controllerResponse;
      })
      .catch((e) => {
        const controllerError = {
          ...e,
          controllerSuccess: false,
          controllerMessage: "Excursion creation failed!",
        };
        return controllerError;
      });
  } catch (e) {
    log(JSON.stringify(e));
    log(e?.response?.data);
  }
};

export const createNews = async (news) => {
  try {
    axios
      .post(`http://localhost:5000/api/news`, {
        news,
      })
      .then((response) => {
        log("News Create Log");
        log(response);
        const controllerResponse = {
          ...response,
          controllerSuccess: true,
          controllerMessage: "News created!",
        };
        log("News Create Log 2");
        log(controllerResponse);

        return controllerResponse;
      })
      .catch((e) => {
        const controllerError = {
          ...e,
          controllerSuccess: false,
          controllerMessage: "News creation failed!",
        };
        return controllerError;
      });
  } catch (e) {
    log(JSON.stringify(e));
    log(e?.response?.data);
  }
};
