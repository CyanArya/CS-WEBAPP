import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../api";

export const getAgentById = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/agents/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const loginWithAgent = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(`${API_URL}/agents/login/${id}`);
    console.log("response is ", response);
    return response.data || {};
  } catch (error) {
    console.error(error);
  }
};
