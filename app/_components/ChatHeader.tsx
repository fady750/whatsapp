import ChatAvatar from "./ChatAvatar";
import ChatHeaderMenu from "./ChatHeaderMenu";
import ChatHeaderUserName from "./ChatHeaderUserName";

export default function ChatHeader(){
    return(
        <header className="px-[15px] py-2.5 w-full h-16 flex items-center relative bg-primary-300 shadow-primary-50" >
            <div className=" mr-2.5" >
                <ChatAvatar/>
            </div>
            <ChatHeaderUserName/>
            <ChatHeaderMenu/>
        </header>
    )
}