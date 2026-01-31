import { AvatarCardLargeWithURL } from "@/shared/ui/Avatar"
import { CardContainer } from "@/shared/ui/CardContainer"
import { CardContent } from "@/shared/ui/CardContent"
import { ChatsIcon, HelpIcon, KeyboardIcon, KeyIcon, LockIcon, LogOut, NotificationIcon } from "@/shared/ui/Icons"
import { OverFlowList } from "@/shared/ui/OverFlowList"
import { Divider } from "@mui/material"
import LogoutForm from "./LogoutForm"
import { useSession } from "next-auth/react"
import { useAppUIContext } from "@/app/_providers/AppUIProvider"


const SettingsAction = [

    {
        ImageSide:()=>( <div className=" py-3 pl-2.5 pr-3.5" > < KeyIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Account" contentInfo="Security notifications, account info"/>)
    },
    {
        ImageSide:()=>( <div className=" py-3 pl-2.5 pr-3.5" > < LockIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Privacy" contentInfo="Blocked Contacts, disappearing messages"/>)
    },
    {
        ImageSide:()=>( <div className=" py-3 pl-2.5 pr-3.5" > < ChatsIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Chats" contentInfo="Theme, wallpaper, chat settings"/>)
    },
    {
        ImageSide:()=>( <div className=" py-3 pl-2.5 pr-3.5" > < NotificationIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Notifications" contentInfo="Message notifications"/>)
    },
    {
        ImageSide:()=>( <div className=" py-3 pl-2.5 pr-3.5" > <KeyboardIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="KeyboardIcon shortcuts" contentInfo="quick action"/>)
    },
    {
        ImageSide:()=>( <div className=" py-3 pl-2.5 pr-3.5" > < HelpIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Help" contentInfo="Help center, contact us, privacy policy"/>)
    },
]

export default function SettingsBody(){
    const {data, status} = useSession();
    const { setLeftPanelMode, setRightPanelMode} = useAppUIContext();
    if(status !== "authenticated") return
    const user = data?.user
    const avatar_url = user.avatar_url;
    const user_name = user?.username
    const info = user?.info

    function handleOnClickProfile(){
        setLeftPanelMode("profile");
        setRightPanelMode("profile");
    }

    return (
        <div className="flex flex-col h-screen w-full relative">
            <OverFlowList styles="pb-[300px]! space-y-2" >

                <CardContainer handleOnClick={handleOnClickProfile} styles="h-fit!" ImageSide={()=>( <div className=" py-3 pl-2.5 pr-3.5" > < AvatarCardLargeWithURL url={avatar_url} styles="h-[64px]! w-[64px]!"/></div>)}
                    ContentSide={()=>(<CardContent CardContentStyles="my-3!" contentHeader={user_name } contentInfo={info} />)} 
                />

                <Divider
                    sx={{
                        color:"text-primary-250!",
                        border:"1px solid",
                        borderColor:"text-primary-250!",
                        marginLeft:8,
                        marginRight:8,
                        marginY:2,
                }} />

                {SettingsAction.map((ele, idx)=>{
                    return(
                        <CardContainer ImageSide={ele.ImageSide} ContentSide= {ele.RightSide} key={idx} />
                    )
                })}

                <LogoutForm>
                    <CardContainer  ImageSide={()=>( <div className=" py-3 pl-2.5 pr-3.5" > < LogOut/></div>)}
                        ContentSide={()=> (<CardContent CardContentStyles="my-3! h-[72px]!" contentHeader="Logout " contentHeaderStyles="text-primary-500!"/>)} 
                        />
                </LogoutForm>

                <Divider
                    sx={{
                        color:"text-primary-250!",
                        border:"1px solid",
                        borderColor:"text-primary-250!",
                        marginLeft:8,
                        marginRight:8,
                        marginTop:4
                    }} />
            
            </OverFlowList>
        </div>
    )
}
