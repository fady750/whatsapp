import ChatsBody from "@/features/chats//ChatsBody";
import ChatsHeader from "@/features/chats/ChatsHeader";
import { memo } from "react";



export default memo( ChatsPanel )

function ChatsPanel (){
    
    return(
        <>
            <ChatsHeader/>
            <ChatsBody />
        </>
    )
}