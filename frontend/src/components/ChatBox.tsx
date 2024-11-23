import { useEffect, useState } from "react"
import { sendMessage, getAllMessagesById } from "../utils/chat"
import { loginWithUser } from "../utils/user"
import io from "socket.io-client"
import { API_URL } from "../../api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

let socket

export default function ChatBox({ id, userType, logout }) {
  const [chatId, setChatId] = useState("")
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    getMessages()
    socketIO()
    return () => {
      if (socket) socket.disconnect()
    }
  }, [])

  async function getMessages() {
    const chat = await loginWithUser(id)
    setChatId(chat.id)
    const messageArray = await getAllMessagesById(parseInt(chat.id))
    setMessages(messageArray)
  }

  async function socketIO() {
    socket = io(API_URL)
    socket.on("connect", () => {
      console.log("socket connected", socket.id)
    })

    socket.emit("join_chat", id)

    socket.on("new_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(userType, id, chatId, newMessage)
      setNewMessage("")
    }
  }

  return (
    <Card className="w-[calc(105vh-25rem)] h-[calc(105vh-25rem)] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Support Chat</CardTitle>
        <Button variant="ghost" onClick={logout}>
          Logout
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full w-full pr-4">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`flex ${
                m.senderType === "agent" ? "justify-start" : "justify-end"
              } mb-4`}
            >
              <div
                className={`rounded-lg p-2 max-w-[70%] ${
                  m.senderType === "agent"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{m.message}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

