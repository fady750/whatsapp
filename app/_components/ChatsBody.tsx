import ChatsList from "./ChatsList";
import SearchInput from "./SearchInput";
import ChatsFilterBar from "@/app/_components/ChatsFilterBar";

export default function ChatsBody (){
    return(
        <div className="flex flex-col h-screen w-full relative">
            <SearchInput/>
            <ChatsFilterBar/>
            <ChatsList/>
        </div>
    )
}