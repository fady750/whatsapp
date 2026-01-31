
import {InitRightSideIcon} from "@/shared/ui/Icons"

export default function InitRightSidePanel (){
    return(
        <div className="py-7 flex flex-col h-full border-l-px items-center justify-center gap-4.5" >
            <InitRightSideIcon/>
            <div className=" flex flex-col gap-.5" >
                <h1 className=" leading-24 text-[43px] font-normal text-primary-250"> Download WhatsApp for Mac </h1>
                <h3 className="font-normal text-primary-250 text-base">Makes calls and get a faster experience when you download the Mac app </h3>
            </div>
            <button className="px-6 bg-primary-200 text-black font-normal text-base rounded-border-radius-fully h-10 cursor-pointer">Get from App Store </button>
        </div>
    )
}