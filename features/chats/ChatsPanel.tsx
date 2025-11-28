import ChatsBody from "@/features/chats//ChatsBody"
import ChatsHeader from "@/features/chats/ChatsHeader"

export default async function ChatsPanel(){
    return(
            <>
                <ChatsHeader/>
                <ChatsBody/>
            </>
    )
}