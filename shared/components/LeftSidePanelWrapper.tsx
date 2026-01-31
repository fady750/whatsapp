import { getContactsAction, getAllConversationAction } from "@/app/_lib/action";
import LeftSidePanel from "./LeftSidePanel";
import { auth } from "@/app/_lib/auth";
import {Conversation} from "@/app/_types/Components"


export default async function LeftSidePanelWrapper({}){
    const userContacts = await getContactsAction();
    const session = await auth();
    const userID = session?.user?.profileID;
    if(userID === undefined) return
    const conversations:Conversation[] = await getAllConversationAction(userID);
    console.log(conversations);
    return(
        <div className=" max-w-[40%] min-w-[336px] flex-[0_0_40%] grow  pl-px bg-[#3C3F3F] flex flex-col h-screen ">
            <div className="flex w-full relative grow flex-wrap h-screen bg-[#171717]" >
                <LeftSidePanel userID={userID} conversations={conversations} contacts = {userContacts} />
            </div> 
        </div>
    )
}