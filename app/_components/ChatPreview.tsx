import { Message } from "@/app/_types/ChatPrereview";
import ChatAvatar from "./ChatAvatar";
import ChatInfo from "./ChatInfo";
type ChatProps = {
    chat:Message;
}
export default function ChatPreview({chat}:ChatProps){
    return(
        <div className=" h-[76px]" >
            <div className="mx-[10px]  rounded-[12px] h-[72px] flex items-center justify-start overflow-hidden cursor-pointer hover:bg-primary-150" >
                <ChatAvatar/>
                <ChatInfo chat={chat}/>
            </div>
        </div>
    )
}