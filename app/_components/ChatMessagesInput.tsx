import {AttachIcon, Emojis, VoiceMessage} from "@/app/_components/ChatIcons"
import ChatMessageInputArea from "./ChatMessageInputArea"

export default function ChatMessagesInput (){
    return(
        <div className=" absolute bottom-[76px] left-0 z-100 w-full min-h-[62px] text-base font-normal outline-none shadow-input-message" >
            <div className="bg-primary-450 p-[5px] mx-3 mb-3 min-h-[52px] h-auto border rounded-[26px] max-w-[1600px] min-w-0" >
                <div className=" w-full h-full flex items-center" >
                    <div className=" h-10 w-10 flex justify-end" >
                        <AttachIcon/>
                    </div>
                    <div className=" mr-1.5 w-10 h-10 flex justify-end" >
                        <Emojis/>
                    </div>
                    <ChatMessageInputArea/>
                    <div className=" w-10 h-10" >
                        <VoiceMessage/>
                    </div>
                </div>
            </div>
        </div>
    )
}