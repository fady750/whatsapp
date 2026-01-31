import {SendMessageAction} from "@/app/_lib/action"
import { useSession } from "next-auth/react";
import { useChatContext } from "../_providers/ChatProvider";

export default function ChatMessageInputArea(){
    const {activeConversation} = useChatContext()
    const {data} = useSession();
    
    const user = data?.user
    const conversationId = activeConversation?.id;
    const senderId = user.profileID;
    async function handleSendingMessage(formData:FormData){
        const content =String (formData.get("content"));
        const MessageObject = {
            conversationId,
            senderId,
            content
        }
        await SendMessageAction(MessageObject)
    }
    return(
        <div className="grow">
            <form action={handleSendingMessage} >
                <input required name="content" placeholder="Type a message" autoComplete="off"  className=" outline-none w-full h-auto wrap-break-word text-primary-250 z-50 " />
            </form>
        </div>
    )
}