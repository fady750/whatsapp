import Image from "next/image";

import SignupForm from "@/app/signup/SignupForm";
import { WhatsAppIcon } from "@/shared/ui/Icons";

export default async function Page(){ 
    return(
        <div className="h-full flex items-center justify-center relative flex-col gap-4 " >
            <div className=" relative aspect-video h-normal w-[72px] " >
                <Image src="/WhatsAppImg.png"
                    // placeholder="blur"
                    quality={100}
                    className="o object-top aspect-video"  
                    fill 
                    alt="whatsAppImg" 
                />
            </div>
            <div className=" font-medium text-[1.25rem]" >
                <WhatsAppIcon/>
            </div>
            <div className=" text-xl font-extralight" >
                <p>Contact With your friends instantly</p>
            </div>
            <div className=" bg-primary-150 shadow-WDS-persistent-always-black-RGB px-8 py-6 rounded-xl">
                <SignupForm/>
            </div>
        </div>
    )
}