import ChatInfoBody from "@/features/chats/ChatInfoBody";
import ChatInfoHeader from "./ChatInfoHeader";
type ChatInfoProps={
    chat:{
        conversationTitle:string,
        date:string,
        MessageStatus:"sent" | "delivered" | "read",
        lastMessage:string,
    }
}

export default function ChatInfo({chat}:ChatInfoProps){
    return(
        <div className="pr-[15px] flex flex-col justify-center overflow-hidden grow basis-auto" >
            <ChatInfoHeader conversationTitle={chat.conversationTitle} date={chat.date}/>
            <ChatInfoBody MessageStat={chat.MessageStatus} lastMessage={chat.lastMessage}  />
        </div>
    )
}