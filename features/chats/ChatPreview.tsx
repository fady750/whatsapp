import { Message } from "@/app/_types/ChatPrereview";
import {AvatarCard} from "@/shared/ui/Avatar";
import ChatInfo from "@/features/chats/ChatInfo";
type ChatProps = {
    chat:Message;
}
export default function ChatPreview({chat}:ChatProps){
    return(
        <div className=" h-[76px]" >
            <div className="mx-2.5  rounded-xl h-[72px] flex items-center justify-start overflow-hidden cursor-pointer hover:bg-primary-150" >
                <AvatarCard/>
                <ChatInfo chat={chat}/>
            </div>
        </div>
    )
}