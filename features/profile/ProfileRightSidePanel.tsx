import {Profile} from "@/shared/ui/Icons"

export default function ProfileRightSidePanel(){
    return(
        <div className=" w-full h-full flex flex-col items-center justify-center gap-5" >
            <div className="text-primary-50" >
                <Profile height="64" width="64" />
            </div>
            <h1 className=" text-primary-250 font-normal text-3xl" >Profile</h1>
        </div>
    )
}