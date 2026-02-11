import { getContactAction } from "@/app/_lib/action";
import { useAppUIContext } from "@/app/_providers/AppUIProvider";
import { useChatContext } from "@/app/_providers/ChatProvider";
import { Conversation, activeConversation } from "@/app/_types/Components";
import ChatInfo from "@/features/chats/ChatInfo";
import { AvatarChatPreview } from "@/shared/ui/Avatar";
import { useSession } from "next-auth/react";

type ChatProps = {
    chat:Conversation;
}


export default function ChatPreview({chat}:ChatProps){
    const {data, status} = useSession();
    const {setActiveConversation, activeConversation} = useChatContext();
    const {setRightPanelMode} = useAppUIContext();

    if(status !== "authenticated") return null;
    const user = data?.user;

    if(user === null) return
    
    const currentUserId = user?.profileID as string;

    async function handleActiveConversation(){
        if(activeConversation !== undefined && activeConversation.id === chat.conversation_id) return
        const contactId = chat.contact_id as string;
        const activeConversationObj = {
            user1_id:currentUserId,
            user2_id:contactId,
            updated_at:chat.updated_at,
            id:chat.conversation_id
        }
        const data = await getContactAction(contactId);
        if (!data) return;

        const obj: activeConversation = {
            id: activeConversationObj.id,
            user1_id: activeConversationObj.user1_id,
            user2_id: activeConversationObj.user2_id,
            updated_at: activeConversationObj.updated_at,
            custom_name: data.custom_name ?? chat.custom_name,
            info: data.info ?? "",
            email: data.email ?? "",
            avatar_url: data.avatar_url ?? chat.avatar_url,
        };
        setActiveConversation(obj);
        setRightPanelMode("chats");
    } 

    if(activeConversation?.id === chat.conversation_id){
        return(
            <div className="h-[76px]">
                    <div className="mx-2.5  rounded-xl h-normal flex items-center justify-start overflow-hidden cursor-pointer bg-primary-150" >
                        <AvatarChatPreview url={chat.avatar_url}/>
                        <ChatInfo chat={chat}/>
                    </div>
            </div>
        )
    }


    return(
        <div className="h-[76px]"  onClick={()=>{handleActiveConversation()}}>
                <div className="mx-2.5  rounded-xl h-normal flex items-center justify-start overflow-hidden cursor-pointer hover:bg-primary-150" >
                    <AvatarChatPreview url={chat.avatar_url}/>
                    <ChatInfo chat={chat}/>
                </div>
        </div>
    )
}