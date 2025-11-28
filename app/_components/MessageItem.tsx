import {Message} from "@/app/_types/Message"
import MessageStatus from "./MessageStatus";

type MessageItemProps = {
    message:Message
}

function formatToHour(dateString: string): string {
  const date = new Date(dateString);

  // Convert to local time
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const formattedHour = hours % 12 || 12;

  // Pad minutes to 2 digits
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinutes} ${ampm}`;
}


export default function MessageItem({message}:MessageItemProps){
    const CurUserId:string = "u1"; 
    return(
        <>
            {   message.senderId === CurUserId 
                ?
                <div className=" pl-[62px] pr-[57px] flex justify-end w-full h-fit select-text z-55" >
                    <div className=" max-w-[346px] w-fit pt-1.5 pl-[7px] pb-2 pr-[9px] rounded-[7.5px] bg-primary-350 flex items-center gap-2" >
                        <div className="text-primary-250 wrap-break-word grow ">
                            {message.content}
                        </div>
                        <div className=" text-primary-100 h-[15px] mb-[-12px]  cursor-pointer text-xs ml-auto" >
                            <div className="flex items-center" >
                                <span>
                                    {formatToHour(message.date)}
                                </span>
                                <MessageStatus MessageStatus={message.status} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="pl-[62px] pr-[57px] flex justify-start w-full h-fit select-text z-55">
                    <div className="max-w-[346px] w-fit pt-1.5 pl-[7px] pb-2 pr-[9px] rounded-[7.5px] bg-primary-450 flex items-center gap-2" >
                        <div className="text-primary-250 wrap-break-word grow ">
                            {message.content}
                        </div>
                        <div className=" text-primary-100 h-[15px] mb-[-12px]  cursor-pointer text-xs ml-auto" >
                            <div className="flex items-center" >
                                <span>
                                    {formatToHour(message.date)}
                                </span>
                                <MessageStatus MessageStatus={message.status} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}