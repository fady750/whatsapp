"use client"
import { activeConversation, Conversation } from "@/app/_types/Components";
import { createContext, useContext, useState } from "react";
const ChatContext = createContext<AppContextType | undefined>(undefined);

type AppContextType = {
    activeConversation:activeConversation | undefined;
    setActiveConversation:React.Dispatch<React.SetStateAction<activeConversation|undefined>>;
    conversationsState:Conversation[] | undefined;
    setConversationsState:React.Dispatch<React.SetStateAction<Conversation[]|undefined>>;
};

type ChatProviderProps = {
    children:React.ReactNode
}

function ChatProvider({ children }:ChatProviderProps){
    const [activeConversation, setActiveConversation] = useState<activeConversation|undefined>(undefined);
    const [conversationsState, setConversationsState] = useState<Conversation[]|undefined>(undefined);
    return(
        <ChatContext.Provider value={{ activeConversation, setActiveConversation, conversationsState, setConversationsState}} >
            {children}
        </ChatContext.Provider>
    )
}


function useChatContext () {
    const context = useContext(ChatContext);
    if(context === undefined) {
        throw new Error("Context was used outside provider");
    }
    return context;
}

export { ChatProvider, useChatContext };
