import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../api";

export const loginWithUser = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}/users/login/${id}`);
    console.log("response issssss ", response);
    return response.data || {};
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/users/`);
    console.log("response  ", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
