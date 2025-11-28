"use client"

import { useAppContext } from "@/app/_components/AppContext"
import  Settings  from "@/features/settings/Settings"
import Contacts from "@/features/Contacts/Contacts"
import AddContact from "@/features/Contacts/addContacts/AddContact";
import ChatsPanel from "@/features/chats/ChatsPanel";
import Profile from "@/features/profile/Profile";


export default function LeftSidePanel(){
    const {leftPanelMode} = useAppContext();
    function handleLeftPanelMode(){
        switch(leftPanelMode){
            case "chats":
                return <ChatsPanel/>;
            case "contacts":
                return <Contacts/>;
            case "newContact":
                return <AddContact/>;
            case "settings":
                return <Settings/>;
            case "profile":
                return <Profile/>
        }
    }

    return(
        <div className=" max-w-[40%] min-w-[336px] flex-[0_0_40%] grow  pl-px bg-[#3C3F3F] flex flex-col h-screen ">
            <div className="flex w-full relative grow flex-wrap h-screen bg-[#171717]" >
                {
                    handleLeftPanelMode()
                }
            </div>
        </div>
    )
}