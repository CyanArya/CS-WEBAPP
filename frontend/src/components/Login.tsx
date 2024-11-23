import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Login({ setId, setUserType }) {
  const [enteredUser, setEnteredUser] = useState("")
  const [enteredUserType, setEnteredUserType] = useState("user")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setId(enteredUser)
    setUserType(enteredUserType)
    window.sessionStorage.setItem("id", enteredUser)
    window.sessionStorage.setItem("userType", enteredUserType)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Welcome to Chat Support</CardTitle>
        <CardDescription className="text-center">Please log in to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="userType">User Type</Label>
              <Select onValueChange={setEnteredUserType} defaultValue={enteredUserType}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="number"
                value={enteredUser}
                onChange={(e) => setEnteredUser(e.target.value)}
                placeholder="Enter your user ID"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

