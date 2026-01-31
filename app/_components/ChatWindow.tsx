import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAllMessagesAction, updateMessagesStateAction } from "../_lib/action";
import { activeConversation } from "../_types/Components";
import { Message } from "../_types/Message";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

export default function ChatWindow({activeConversation}:{activeConversation:activeConversation|undefined}){

    const [messages,setMessages] = useState<Message[]>([])
    const {data, status} = useSession();
    const user = data?.user;
    const profileID = user?.profileID;

    useEffect(()=>{
        async function updateMessagesConversation(){
            const user2_id = activeConversation?.user1_id === profileID ? activeConversation?.user2_id : activeConversation?.user1_id;
            if (activeConversation?.id === undefined || user2_id === undefined) return ;
            await updateMessagesStateAction({conversation_id:activeConversation?.id,sender_id:user2_id});
        }
        async function loadMessages(){
            const data = await getAllMessagesAction(activeConversation?.id);
            setMessages(data);
        }
        updateMessagesConversation();
        loadMessages();
    }, [activeConversation?.id])

    if(status!== "authenticated") return null;

    return (
        <div className=" overflow-x-hidden h-full overflow-y-hidden  border-l-px relative grow z-100"> 
            <ChatHeader/>
            <ChatMessages messages={messages} setMessages={setMessages}/>
        </div>
    );
}