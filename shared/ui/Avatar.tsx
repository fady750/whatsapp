import Image from "next/image";
import{ AddContact } from "@/app/_components/Icons"

type AvatarCardLargeProps={
    styles?:string;
    url?:string;
}

export function AvatarCard(){
    return(
        <div className="flex items-center justify-center pl-[13px] pr-4 py-2">
            <div className=" relative " >
                <Image className="  cursor-pointer h-[49px]! w-[49px]! object-cover rounded-border-radius-fully" alt="userImage" src="/img.jpeg" height={49} width={49} />
            </div>
        </div>
    )
}

export function AvatarCardWithUrl({url}:{url:string|undefined}){
    return(
        <div className="flex items-center justify-center pl-[13px] pr-4 py-2">
            <div className=" relative " >
                <Image className="  cursor-pointer object-cover rounded-border-radius-fully" alt="userImage" src={url} height={24} width={24} />
            </div>
        </div>
    )
}

export function AvatarCardWithURLAndStyles({url, imageStyles}:{url:string|undefined, imageStyles?:string}){
    return(
        <div className="flex items-center justify-center pl-[13px] pr-4 py-2">
            <div className=" relative " >
                <Image className={` cursor-pointer object-cover rounded-border-radius-fully ${imageStyles} `} alt="userImage" src={url} height={24} width={24} />
            </div>
        </div>
    )
}

export function AvatarChatPreview({url}:{url:string|undefined}){
    return(
        <div className="flex items-center justify-center pl-[13px] pr-4 py-2">
            <div className=" relative " >
                <Image className="  cursor-pointer object-cover rounded-border-radius-fully w-12! h-12!" quality={100} alt="userImage" src={url} height={49} width={49} />
            </div>
        </div>
    )
}

export function AvatarCardLarge({styles}:AvatarCardLargeProps){
    return(
        <div className={`flex items-center justify-center pl-[13px] pr-4 py-2 ${styles}`}>
            <div className=" relative " >
                <Image className={` cursor-pointer  object-cover rounded-border-radius-fully ${styles} `} quality={100} alt="userImage" src="/img.jpeg" height={64} width={64} />
            </div>
        </div>
    )
}

export function AvatarCardLargeWithURL({styles, url}:AvatarCardLargeProps){
    return(
        <div className={`flex items-center box-content justify-center px-4 py-4 ${styles}`}>
            <div className=" relative flex items-center justify-center aspect-square w-full" >
                <Image className={` cursor-pointer object-cover rounded-border-radius-fully aspect-square w-full `}  alt="userImage" src={url} fill  />
            </div>
        </div>
    )
}

export function AvatarCreateContact(){
    return(
        <div className=" flex items-center justify-center pl-[13px] pr-4 py-2" >
            <div className="flex w-[49px] h-[49px] items-center justify-center bg-primary-200 rounded-border-radius-fully">
                <AddContact/>
            </div>
        </div>
    )
}

