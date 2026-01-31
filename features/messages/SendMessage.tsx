import { Message } from "@/app/_types/Message";
import {formatToHourAndMin} from "@/app/_lib/helper"
import MessageStatus from "./MessageStatus";

export default function SendMessage({message}:{message:Message}){
    return(
        <div className="max-h-[100px] h-fit pl-[62px] pr-[57px] flex justify-end w-full select-text z-55">
            <div className="h-fit max-w-[346px] w-fit min-h-[15px] pt-1.5 pl-[7px] pb-2 pr-[9px] rounded-[7.5px] bg-primary-350 flex items-center flex-wrap gap-2" >
                <div className=  " h-fit text-primary-250 wrap-break-word grow w-fit ">
                    {message.content}
                </div>
                <div className=" text-right w-fit text-primary-100 h-[15px] ml-auto" >
                    <div className="flex items-center gap-1 h-fit" >
                        <span className="" >
                            {formatToHourAndMin(message.created_at)}
                        </span>
                        <MessageStatus MessageStatus={message.status} />
                    </div>
                </div>
            </div>
        </div>
    )
}