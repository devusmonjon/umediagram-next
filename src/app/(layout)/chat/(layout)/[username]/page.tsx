// import { messages } from "@/constants/messages"
import ChatPageComponent from "./page-component"

const ChatPage = ({params}: {params: {username: string}}) => {
  return (
    <ChatPageComponent username={params.username} />
  )
}

export default ChatPage