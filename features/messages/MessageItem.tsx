import { Message } from "@/app/_types/Message";
import { useSession } from "next-auth/react";
import ReceiveMessage from "./ReciveMessage";
import SendMessage from "./SendMessage";
export default function MessageItem ({message}:{message:Message}){
    const {data} = useSession();
    const user = data?.user;
    const CurUserId = user?.profileID; 
    return(
        message.sender_id === CurUserId 
        ?
        <SendMessage message={message} />
        :
        <ReceiveMessage message={message}/>
    )
}