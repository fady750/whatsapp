import ChatsList from "@/features/chats/ChatsList";
import SearchInput from "@/shared/ui/SearchInput";
import ChatsFilterBar from "@/features/chats/ChatsFilterBar";

export default function ChatsBody (){
    return(
        <div className="flex flex-col h-screen w-full relative">
            <SearchInput/>
            <ChatsFilterBar/> 
            <ChatsList/>
        </div>
    )
}