import { useEffect, useState } from "react"
import { loginWithAgent } from "../utils/agent"
import { assignChatToMe, getAllChats } from "../utils/chat"
import { getAllMessages } from "../utils/message"
import ChatBox from "./ChatBox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AgentDashboard({ id, logout }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [allChats, setAllChats] = useState([])
  const [myChats, setMyChats] = useState([])
  const [allMessages, setAllMessages] = useState([])

  useEffect(() => {
    loadChats()
  }, [selectedUser])

  function logoutFromUser() {
    setSelectedUser(null)
  }

  async function loadChats() {
    const agent = await loginWithAgent(id)
    setMyChats(agent.assignedChats)
    const chats = await getAllChats()
    setAllChats(chats)
    const msgs = await getAllMessages()
    setAllMessages(msgs)
  }

  return (
    <div className="flex w-full h-full">
      {/* Chat List Section */}
      <Card className="flex-grow max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Agent Dashboard</CardTitle>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full w-full pr-4">
            {allChats
              .map((chat) => ({
                id: chat.id,
                mine: myChats.includes(chat.id),
                assigned: chat.assigned,
                message: allMessages.find((m) => chat.id == m.chatId),
              }))
              .filter((msg) => msg?.message)
              .map((msg) => (
                <ChatItem
                  key={msg.id}
                  user={msg.message.senderId}
                  id={msg.id}
                  mine={msg.mine}
                  assigned={msg.assigned}
                  msg={msg.message}
                  onAssign={() => {
                    if (!msg.assigned) assignChatToMe(msg.id, id)
                    setSelectedUser(msg.message.senderId)
                  }}
                />
              ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* ChatBox Section */}
      {selectedUser && (
        <div className="flex-grow ml-4">
          <ChatBox id={selectedUser} userType="agent" logout={logoutFromUser} />
        </div>
      )}
    </div>
  )
}

function ChatItem({ id, user, mine, assigned, msg, onAssign }) {
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="font-semibold">User {user}</span>
        <span className="text-sm text-muted-foreground">{msg.message}</span>
      </div>
      <Button
        onClick={onAssign}
        disabled={assigned && !mine}
        variant={assigned ? (mine ? "default" : "secondary") : "outline"}
      >
        {assigned ? (mine ? "Go to" : "Assigned") : "Assign me"}
      </Button>
    </div>
  )
}
