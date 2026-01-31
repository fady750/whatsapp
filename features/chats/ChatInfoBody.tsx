import MessageStatus from "@/features/messages/MessageStatus";
import { useSession } from "next-auth/react";

type ChatContentProps = {
    MessageStat: "sent" | "delivered" | "read",
    lastMessage : string,
    senderID:string,
}

export default function ChatInfoBody({MessageStat, lastMessage, senderID} : ChatContentProps){
    const {data, status} = useSession();
    if(status !== "authenticated") return;
    const isSender = data?.user.profileID === senderID;
    console.log("senderID", senderID)
    console.log("data?.user.id", data?.user.profileID);

    return(
        <div className=" flex items-center justify-start min-h-5 overflow-hidden mt-0.5 font-normal gap-1" >
                {
                    !isSender
                    &&
                    <div className="" >
                        <MessageStatus MessageStatus={MessageStat}/>
                    </div>
                }
                <div className="grow truncate overflow-hidden" >
                    <span className=" max-w-0.5 truncate" >
                        {lastMessage}
                    </span>
                </div>
        </div>
    )
}