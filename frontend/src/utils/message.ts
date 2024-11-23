import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../api";

export const getAllMessages = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/messages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
