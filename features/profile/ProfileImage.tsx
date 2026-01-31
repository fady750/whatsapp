import { AvatarCardLargeWithURL } from "@/shared/ui/Avatar";
import ChangeImage from "./ChangeImage";

export default function ProfileImage({url}:{url:string|undefined}){
    return(
        <div className="w-full my-7 flex items-center justify-center">
            <div className="group relative w-fit h-fit flex items-center justify-center" >
                <AvatarCardLargeWithURL url={url} styles="h-[128px]! w-[128px]!" />
                <ChangeImage />
            </div>
        </div>
    )
}














