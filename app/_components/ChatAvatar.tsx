import Image from "next/image";

export default function ChatAvatar(){
    return (
        <div className="flex ">
            <div className="pl-[13px] pr-[15px] relative " >
                <Image className="  cursor-pointer h-[49px]! w-[49px]! object-cover rounded-border-radius-fully" alt="userImage" src="/img.jpeg" height={49} width={49} />
            </div>
        </div>
    )
}