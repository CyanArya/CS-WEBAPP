import axios from "axios";
import { API_URL } from "../../api";

export const loginWithUser = async (id) => {
  try {
    const response = await axios.post(API_URL + "/users/login/" + id);
    console.log("response issssss ", response);

    return response.data || {};
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL + "/users/");
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
