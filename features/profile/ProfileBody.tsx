import { AvatarCardLarge } from "@/shared/ui/Avatar";

export default function ProfileBody(){
    return(
        <div className=" flex flex-col w-full mb-[150px]">
            <div className=" w-full my-7 flex items-center justify-center" >
                <AvatarCardLarge styles="h-[128px]! w-[128px]!" />
            </div>
            <div className="flex flex-col items-start px-[30px] pt-3.5 pb-2.5 gap-2 mb-2.5" >
                <p className="text-primary-50 font-medium" >Name</p>
                <div className=" text-primary-250" >
                    fady nasser
                </div>
            </div>
            <div className="flex flex-col items-start px-[30px] pt-3.5 pb-2.5 gap-2 mb-2.5" >
                <p className="text-primary-50 font-medium" >About</p>
                <div className=" text-primary-250" >
                    .
                </div>
            </div>
            <div className="flex flex-col items-start px-[30px] pt-3.5 pb-2.5 gap-2 mb-2.5" >
                <p className="text-primary-50 font-medium" >Email</p>
                <div className=" text-primary-250" >
                    fadynn7@gmail.com
                </div>
            </div>
        </div>
    )
}