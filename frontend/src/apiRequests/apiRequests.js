import axios from "axios";
import { setAdmin, setUser, updateUser } from "../Reducers/userReducer";
const { log } = console;

export const registration = async ({ email, password, phoneNumber }) => {
  let message = "Something went wrong";
  try {
    axios
      .post(
        `http://localhost:5000/api/registration`,
        {
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);

        if (response.status(200) || response.status(201)) {
          message = "User is registered";
        } else {
          message = "Registration Error";
        }
      });

    return message;
  } catch (e) {
    log(e);
    log(e.response?.data?.message);
  }
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      axios
        .post(
          `http://localhost:5000/api/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Api Req Response");
          console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          if (response.data.user.role.includes("ADMIN")) {
            dispatch(setAdmin(response.data.user));
          } else {
            dispatch(setUser(response.data.user));
          }
        });
    } catch (e) {
      log("Login Api Error" + e);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      axios
        .get(`http://localhost:5000/api/refresh`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.accessToken);
          dispatch(updateUser());
        });
    } catch (e) {}
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
        console.log("Post created!");

        return response;
      })
      .catch((e) => {
        console.log("Error occurred. Post wasn't created");
        console.log(e);
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
