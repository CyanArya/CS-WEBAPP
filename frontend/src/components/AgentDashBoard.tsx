import { useEffect, useState } from "react";
import { loginWithAgent } from "../utils/agent";
import { assignChatToMe, getAllChats } from "../utils/chat";
import { getAllMessages } from "../utils/message";
import UserChat from "./ChatBox";

const AgentDashBoard = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [myChats, setMyChats] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  console.log(selectedUser);
  useEffect(() => {
    loadChats();
  }, [selectedUser]);

  function logoutFromUser() {
    setSelectedUser(null);
  }

  async function loadChats() {
    const agent = await loginWithAgent(props.id);
    setMyChats(agent.assignedChats);
    const chats = await getAllChats();
    setAllChats(chats);
    const msgs = await getAllMessages();
    setAllMessages(msgs);
  }
  return (
    <div className="agent-dashboard">
      <div className="user-requests">
        <div className="agent-dash-title">
          <div>Agent no.{props.id}</div>
          <div>
            <button onClick={() => props.logout()}>Logout</button>
          </div>
        </div>
        <div className="users-lists">
          {allChats
            .map((chat) => {
              console.log(chat);
              return {
                id: chat.id,
                mine: myChats.includes(chat.id),
                assigned: chat.assigned,
                message: allMessages.filter((m) => {
                  return chat.id == m.chatId;
                })[0],
              };
            })
            .filter((msg) => msg?.message)
            .map((msg) => {
              return (
                <Chat
                  key={msg.id}
                  user={msg.message.senderId}
                  id={msg.id}
                  mine={msg.mine}
                  assigned={msg.assigned}
                  msg={msg.message}
                />
              );
            })}
        </div>
      </div>
      <div>
        {selectedUser && (
          <UserChat
            id={selectedUser}
            userType={"agent"}
            logout={logoutFromUser}
          />
        )}
      </div>
    </div>
  );

  function Chat({ id, user, mine, assigned, msg }) {
    return (
      <div className="chat-item">
        <div>[{id}]</div>
        <div>{msg.message}</div>
        <div>
          <button
            disabled={assigned && !mine}
            className="assign-btn"
            onClick={() => {
              if (!assigned) assignChatToMe(id, props.id);
              setSelectedUser(user);
            }}
          >
            {assigned ? (mine ? "Go to" : "Assigned ") : "Assign me"}
          </button>
        </div>
      </div>
    );
  }
};

export default AgentDashBoard;
