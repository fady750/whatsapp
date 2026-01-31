import { Message } from "@/app/_types/Message";
import {formatToHourAndMin} from "@/app/_lib/helper" 

export default function ReceiveMessage({message}:{message:Message}){
    return(
        <div className="pl-[62px] pr-[57px] h-fit max-h-[1000px] flex justify-start w-full select-text z-55">
            <div className="h-fit max-w-[346px] w-fit pt-1.5 pl-[7px] pb-2 pr-[9px] rounded-[7.5px] bg-primary-450 flex items-center gap-2" >
                <div className="h-fit text-primary-250 wrap-break-word grow ">
                    {message.content}
                </div>
                <div className=" text-primary-100 h-[15px] -mb-3  cursor-pointer text-xs ml-auto" >
                    <div className="flex items-center" >
                        <span>
                            {formatToHourAndMin(message.created_at)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}