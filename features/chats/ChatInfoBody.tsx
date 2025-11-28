import MessageStatus from "@/app/_components/MessageStatus";

type ChatContentProps = {
    MessageStat: "sent" | "delivered" | "read",
    lastMessage : string,
}

export default function ChatInfoBody({MessageStat, lastMessage} : ChatContentProps){
    return(
        <div className=" flex items-center justify-start min-h-5 overflow-hidden mt-0.5 font-normal gap-1" >
                <div className="" >
                    <MessageStatus MessageStatus={MessageStat}/>
                </div>
                <div className="grow truncate overflow-hidden" >
                    <span className=" max-w-0.5 truncate" >
                        {lastMessage}
                    </span>
                </div>
        </div>
    )
}