import { activeConversation } from "@/app/_types/Components"
import Image from "next/image"

export default function ContactInfoContent({activeConversation}:{activeConversation:activeConversation}){
    return(
        <div>
            <div className="p-5" >
                <div className=" h-32 mb-2.5 w-full flex items-center justify-center" >
                    <div className={`flex items-center justify-center pl-[13px] pr-4 py-2`}>
                        <div className=" relative overflow-hidden" >
                            <Image className={` cursor-pointer  object-cover rounded-border-radius-fully h-[122px]! w-[122px]! `} quality={100} alt="userImage" src={activeConversation.avatar_url} height={122} width={122} />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full h-[66px] flex flex-col gap-2.5 items-center mb-2.5" >
                <p className=" text-primary-250 text-2xl" >{activeConversation.custom_name}</p>
                <p className=" text-primary-100" >{activeConversation.email}</p>
            </div>
            <div className=" w-full px-5 py-2.5 mb-5" >
                <p className="font-medium text-primary-100 text-base" >About</p>
                <p className=" text-[15px] text-primary-250" >{activeConversation.info}</p>
            </div>
        </div>
    )
}