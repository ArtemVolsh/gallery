import axios from "axios";

export const getUserById = async (id) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/users`, {
      id,
    });

    return response;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
  }
};
