import { AvatarCardWithUrl } from "@/shared/ui/Avatar";
import ChatHeaderMenu from "./ChatHeaderMenu";
import ChatHeaderUserName from "./ChatHeaderUserName";
import { useAppUIContext } from "../_providers/AppUIProvider";
import { useChatContext } from "../_providers/ChatProvider";
import Image from "next/image";

export default function ChatHeader(){
    const {setRightPanelMode} = useAppUIContext();
    const {activeConversation} = useChatContext();

    if(!activeConversation) return null;
    function handleSetRightPanelMode(){
        setRightPanelMode("contactInfo");
    }
    return(
        <header onClick={handleSetRightPanelMode} className="cursor-pointer px-[15px] py-2.5 w-full h-16 flex items-center relative bg-primary-300 shadow-primary-50">
            <div className=" mr-4">
                <div className=" relative rounded-full overflow-hidden " >
                    <Image className="w-10! h-10! object-cover " alt="userImage" src={activeConversation.avatar_url} width={40} height={40} quality={100} />
                </div>
            </div>
            <ChatHeaderUserName name={activeConversation?.custom_name} />
            <ChatHeaderMenu/>
        </header>
    )
}