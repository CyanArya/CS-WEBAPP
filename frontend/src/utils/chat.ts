import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../api";

export const getChatById = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/chats/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllChats = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/chats/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllMessagesById = async (id: string): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_URL}/chats/${id}/messages`);
    console.log("response of getAllMessages", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (
  senderType: string,
  senderId: string,
  chatId: string,
  message: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/chats/${chatId}/messages`, {
      senderType,
      senderId,
      chatId,
      message,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const assignChatToMe = async (id: string, agentId: string): Promise<any> => {
  try {
    const reqObj = { id: agentId };
    const response: AxiosResponse = await axios.post(`${API_URL}/chats/assign/${id}`, reqObj);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
