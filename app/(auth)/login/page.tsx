import Image from "next/image";
import { WhatsAppIcon } from "@/shared/ui/Icons";
// import SignInButton from "@//_components/SignInButton";
import SignInButton from "@/app/_components/SignInButton"
import LoginForm from "./loginForm";
import Link from "next/link";

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
                <Link className="w-full text-center hover:text-primary-350 transition duration-300"  href="/signup" >Sign up?</Link>   
                <SignInButton/>
            </div>
        </div>
    )
}