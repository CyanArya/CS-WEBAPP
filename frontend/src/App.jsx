import { useState, useEffect } from "react";
import "./App.css";
import AgentDashBoard from "./components/AgentDashBoard";
import Login from "./components/Login";
import ChatBox from "./components/ChatBox";

function App() {
  const [userType, setUserType] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    let storedUser = window.sessionStorage.getItem("id");
    let storedUserType = window.sessionStorage.getItem("userType");
    setId(storedUser);
    setUserType(storedUserType);
  }, []);

  function logout() {
    setId("");
    setUserType("");
    window.sessionStorage.setItem("id", "");
    window.sessionStorage.setItem("userType", "");
  }

  return (
    <div className="App">
      {(!id && <Login setId={setId} setUserType={setUserType} />) ||
        (userType == "user" ? (
          <ChatBox id={id} userType={userType} logout={logout} />
        ) : (
          <AgentDashBoard id={id} logout={logout} />
        ))}
    </div>
  );
}

export default App;
