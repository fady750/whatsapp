"use client"

import SettingsRightSidePanel from "@/features/settings/SettingsRightSidePanel"
import ProfileRightSidePanel from "@/features/profile/ProfileRightSidePanel"
import InitRightSidePanel from "@/shared/components/InitRightSidePanel"
import ChatWindow from "@/app/_components/ChatWindow"
import ContactInfo from "@/features/contactInfo/ContactInfo"
import { useAppUIContext } from "@/app/_providers/AppUIProvider"
import { useChatContext } from "@/app/_providers/ChatProvider"

export default function RightSidePanel(){
    const {rightPanelMode} = useAppUIContext();
    const {activeConversation} = useChatContext();
    return(
        <div className="w-full h-full" >
            {rightPanelMode === "settings" && <SettingsRightSidePanel/>}
            {rightPanelMode === "profile" && <ProfileRightSidePanel/>}
            {rightPanelMode === "init"  && <InitRightSidePanel/>}
            {rightPanelMode === "contactInfo" && <ContactInfo activeConversation={activeConversation} />}
            {(rightPanelMode === "chats"  && activeConversation !== undefined) ? <ChatWindow activeConversation={activeConversation}/> : <InitRightSidePanel/> }
        </div>
    )
}