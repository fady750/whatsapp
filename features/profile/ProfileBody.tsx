import { useSession } from "next-auth/react";
import ChangeInfo from "./ChangeInfo";
import ChangeName from "./ChangeName";
import ProfileImage from "./ProfileImage";
// import ChangeImage from "./ChangeImage";

export default function ProfileBody(){
    const { data, status, update} = useSession();
    const user = data?.user;
    const email = user?.email;
    const name = user?.username;
    const info = user?.info;

    if(status !== "authenticated") return null;


    return(
        <div className=" relative flex flex-col w-full mb-[150px]">
            {/* <ChangeImage /> */}
            <ProfileImage url={user?.avatar_url} />
            
            <ChangeName name={name} />
            <ChangeInfo info={info} />
            <div className="flex flex-col items-start px-[30px] pt-3.5 pb-2.5 gap-2 mb-2.5" >
                <p className="text-primary-50 font-medium" >Email</p>
                <div className=" text-primary-250" >
                    {email}
                </div>
            </div>
        </div>
    )
}