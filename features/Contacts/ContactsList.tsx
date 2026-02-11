import { getConversationAction } from "@/app/_lib/action";
import { useAppUIContext } from "@/app/_providers/AppUIProvider";
import { useChatContext } from "@/app/_providers/ChatProvider";
import { activeConversation, contact } from "@/app/_types/Components";
import { AvatarCardWithURLAndStyles } from "@/shared/ui/Avatar";
import { CardContactCard } from "@/shared/ui/CardContainer";
import { CardContent } from "@/shared/ui/CardContent";
import { OverFlowList } from "@/shared/ui/OverFlowList";
import { useSession } from "next-auth/react";
import AddContacts from "./addContacts/AddContactButton";

type ContactsListProps = {
    contacts : contact[] | null;
}

export default function ContactsList({contacts}:ContactsListProps){
    const { setRightPanelMode } = useAppUIContext();
    const {setActiveConversation} = useChatContext();
    const {data, status} = useSession();
    if(status !== "authenticated") return null;
    const user = data.user;
    const userId = user?.profileID;
    async function handleOnClick(contact:contact){
        const activeConversationObj = await getConversationAction ({contactId:contact.id, currentUserId:userId})
        const Conversation:activeConversation = {
            ...activeConversationObj,
            ...contact,
            id:activeConversationObj.id,
            user2_id:contact.id,
        }
        setActiveConversation(Conversation);
        setRightPanelMode("chats");
    }
    return(
        <OverFlowList>
            <AddContacts/>
            {contacts?.map((ele, idx)=>{
                return(
                    <form onClick={()=>{
                        handleOnClick(ele)
                    }} key={idx} >
                        <CardContactCard key={ele.id} ImageSide={()=><AvatarCardWithURLAndStyles imageStyles=" w-[49px]" url={ele.avatar_url ?? ""} />} ContentSide={()=>(<CardContent CardContentStyles="my-3!" contentHeader={ele.custom_name } contentInfo={ele.info ?? ""   } />)} />
                    </form>
                )
            })}
        </OverFlowList>
    )
}