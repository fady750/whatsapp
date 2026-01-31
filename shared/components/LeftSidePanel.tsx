"use client"

import { getAllConversationAction } from "@/app/_lib/action";
import { getUpdatedLastMessage } from "@/app/_lib/data-service";
import { supabaseClient as supabase } from "@/app/_lib/supabaseClient";
import { useAppUIContext } from "@/app/_providers/AppUIProvider";
import { useChatContext } from "@/app/_providers/ChatProvider";
import { contact, Conversation } from "@/app/_types/Components";
import Contacts from "@/features/Contacts/Contacts";
import AddContact from "@/features/Contacts/addContacts/AddContact";
import ChatsPanel from "@/features/chats/ChatsPanel";
import Profile from "@/features/profile/Profile";
import Settings from "@/features/settings/Settings";
import { useCallback, useEffect } from "react";


type LeftSidePanelProps = {
    contacts: contact[] | null;
    conversations: Conversation[] | undefined;
    userID:string;
}

function updateConversationState(prevState: any[], payload: any) {
    const updatedConversation = payload.new;
    console.log("payload ", payload);
    if (payload.eventType === "UPDATE") {
        console.log("updatedConversation",)
        return prevState.map(conv =>
            conv.conversation_id === updatedConversation.id
                ? { ...conv, ...updatedConversation } // merge updated info
                : conv
        );
    }
    if (payload.eventType === "INSERT") {
        // Optionally add the new conversation
        return [...prevState, updatedConversation];
    }
    return prevState;
}

export default function LeftSidePanel({contacts, conversations, userID}:LeftSidePanelProps){
    const {leftPanelMode} = useAppUIContext();
    const {setConversationsState} = useChatContext();

    const handlePayload = useCallback(
        async (payload: any) => {
            console.log("use useCallback function", payload.eventType)
            if (!userID) return;

            if (payload.eventType === "UPDATE") {
                let updatedConversation = payload.new;
                if (updatedConversation.last_message_id) {
                    try {
                        const lastMsg = await getUpdatedLastMessage(updatedConversation.last_message_id);
                            updatedConversation = { ...updatedConversation, ...lastMsg };
                        } catch (err) {
                            console.error("Failed to fetch last message:", err);
                        }
                }
                setConversationsState(prev =>
                    updateConversationState(prev, { ...payload, new: updatedConversation })
                );
            }

            if (payload.eventType === "INSERT") {
                try {
                    console.log("payload.eventType === INSERT");
                    const allConversations = await getAllConversationAction(userID);
                    console.log("allConversations", allConversations);
                    setConversationsState(allConversations);
                } catch (err) {
                console.error("Failed to fetch all conversations:", err);
                }
            }
        },
        [userID, setConversationsState]
    );

    useEffect(()=>{
        const channel = supabase
        .channel("conversations-sidebar")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "conversations",
                // filter: `or=(user1_id.eq."${userID}",user2_id.eq."${userID}")`
            },
            handlePayload
        ).subscribe((status) => {});
        console.log("ChatList real time")
        return () => {supabase.removeChannel(channel);};

    }, [userID, handlePayload])

    useEffect(()=>{ 
        setConversationsState( conversations );
    }, [])
    
    return (
        <>
            {leftPanelMode === "chats" && <ChatsPanel userID={userID} setConversationsState={setConversationsState} />}
            {leftPanelMode === "settings" && <Settings/>}
            {leftPanelMode === "contacts" && <Contacts contacts = {contacts} />}
            {leftPanelMode === "newContact" && <AddContact/>}
            {leftPanelMode === "profile" && <Profile/>}
        </>
    )

}