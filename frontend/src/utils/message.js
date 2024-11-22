import axios from "axios";
import { API_URL } from "../../api";

export const getAllMessages = async () => {
  try {
    const response = await axios.get(API_URL + "/messages");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
