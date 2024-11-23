import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import { loginWithUser } from "../utils/user";
const UserBoard = (props) => {
  const [chats, setChats] = useState("");

  function logout() {
    props.setId("");
    props.setUserType("");
    window.sessionStorage.setItem("id", "");
    window.sessionStorage.setItem("userType", "");
  }

  useEffect(async () => {
    const c = loginWithUser(id);
    setChats(c.id);
  }, []);

  if (chats)
    return (
      <ChatBox
        id={props.id}
        chatId={chats}
        userType={props.userType}
        logout={logout}
      />
    );
};

export default UserBoard;
