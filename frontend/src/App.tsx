import { useState, useEffect } from "react"
import { ThemeProvider } from "./components/theme-provider"
import Login from "./components/Login"
import ChatBox from "./components/ChatBox"
import AgentDashboard from "./components/AgentDashboard"

export default function App() {
  const [userType, setUserType] = useState("")
  const [id, setId] = useState("")

  useEffect(() => {
    const storedUser = window.sessionStorage.getItem("id")
    const storedUserType = window.sessionStorage.getItem("userType")
    setId(storedUser || "")
    setUserType(storedUserType || "")
  }, [])

  function logout() {
    setId("")
    setUserType("")
    window.sessionStorage.setItem("id", "")
    window.sessionStorage.setItem("userType", "")
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="h-full bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden">
          {!id ? (
            <Login setId={setId} setUserType={setUserType} />
          ) : userType === "user" ? (
            <ChatBox id={id} userType={userType} logout={logout} />
          ) : (
            <AgentDashboard id={id} logout={logout} />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

