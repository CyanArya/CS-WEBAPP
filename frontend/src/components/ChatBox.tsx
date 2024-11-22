import { useEffect, useState } from "react";
import { sendMessage, getAllMessagesById } from "../utils/chat";
import { loginWithUser } from "../utils/user";
import io from "socket.io-client";
import { API_URL } from "../../api";

var socket;

const ChatBox = (props) => {
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  //all useEffects
  useEffect(() => {
    getMessages();
    socketIO();
  }, []);

  useEffect(() => {
    setMessages([...messages, receivedMessage]);
  }, [receivedMessage]);

  //helper functions
  async function getMessages() {
    const chat = await loginWithUser(props.id);
    setChatId(chat.id);
    var messageArray = await getAllMessagesById(parseInt(chat.id));
    setMessages(messageArray);
  }
  async function socketIO() {
    socket = io(API_URL);
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });

    socket.emit("join_chat", props.id);

    socket.on("new_message", (message) => {
      console.log("you've got mail");
      setReceivedMessage(message);
    });
  }

  return (
    <div className="userchat">
      <div className="userchat-title">
        <div>Support</div>
        <div>
          <button onClick={() => props.logout()}>Logout</button>
        </div>
      </div>
      <div className="messages">
        {messages &&
          messages.slice(0).map((m) => {
            return (
              <div
                key={Math.random()}
                className={
                  `message-bubble ` +
                  (m.senderType == "agent" ? "agent-msg" : "user-msg")
                }
              >
                {m.senderType == "agent" ? "Support: " : "You: "}
                {m.message}
              </div>
            );
          })}
      </div>

      <div className="chat-panel">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            sendMessage(props.userType, props.id, chatId, newMessage);
            setNewMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
