import axios from "axios";
import { API_URL } from "../../api";

export const getChatById = async (id) => {
  try {
    const response = await axios.get(API_URL + "/chats/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async () => {
  try {
    const response = await axios.get(API_URL + "/chats/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessagesById = async (id) => {
  try {
    const response = await axios.get(API_URL + "/chats/" + id + "/messages");
    console.log("response of getallmessages", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (senderType, senderId, chatId, message) => {
  try {
    axios
      .post(API_URL + "/chats/" + chatId + "/messages", {
        senderType: senderType,
        senderId: senderId,
        chatId: chatId,
        message: message,
      })
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const assignChatToMe = async (id, agentId) => {
  try {
    const reqObj = {
      id: agentId,
    };

    const response = await axios
      .post(API_URL + "/chats/assign/" + id, reqObj)
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
