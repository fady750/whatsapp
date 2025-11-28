import Image from "next/image";
import { WhatsAppIcon } from "@/shared/ui/Icons";
import SignInButton from "../_components/SignInButton";
import LoginForm from "./loginForm";

export default function Page(){
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
            <div className=" bg-primary-150 shadow-WDS-persistent-always-black-RGB px-8 py-6 rounded-xl flex flex-col gap-5">
                <LoginForm/>
                <SignInButton/>
            </div>
        </div>
    )
}