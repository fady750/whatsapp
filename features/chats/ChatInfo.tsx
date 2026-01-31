import { Conversation } from "@/app/_types/Components";
import ChatInfoBody from "@/features/chats/ChatInfoBody";
import ChatInfoHeader from "./ChatInfoHeader";
type ChatInfoProps={
    chat:Conversation;
}

export default function ChatInfo({chat}:ChatInfoProps){
    console.log("chat", chat);
    return(
        <div className="pr-[15px] flex flex-col justify-center overflow-hidden grow basis-auto" >
            <ChatInfoHeader  conversationTitle={chat.custom_name} date={chat.updated_at}/>
            <ChatInfoBody senderID={chat.sender_id} MessageStat={chat.lastMessageState} lastMessage={chat.lastMessage}  />
        </div>
    )
}