import axios from "axios";
import { API_URL } from "../../api";

export const getAgentById = async (id) => {
  try {
    const response = await axios.get(API_URL + "/agents/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginWithAgent = async (id) => {
  try {
    const response = await axios.post(API_URL + "/agents/login/" + id);
    console.log("response is ", response);

    return response.data || {};
  } catch (error) {
    console.log(error);
  }
};
