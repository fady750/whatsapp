import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

export default function ChatWindow(){
    return (
        <div className=" overflow-x-hidden h-full overflow-y-hidden origin-top-left border-l-px relative grow z-100"> 
            <ChatHeader/>
            <ChatMessages/>
        </div>
    );
}