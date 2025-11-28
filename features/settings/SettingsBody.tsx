import { AvatarCardLarge } from "@/shared/ui/Avatar"
import { CardContent } from "@/shared/ui/CardContent"
import { OverFlowList } from "@/shared/ui/OverFlowList"
import { KeyIcon, LockIcon, ChatsIcon, NotificationIcon, KeyboardIcon, HelpIcon, LogOut } from "@/shared/ui/Icons"
import { CardContainer, CardContainerNormal } from "@/shared/ui/CardContainer"
import { Divider } from "@mui/material"
import LogoutForm from "./LogoutForm"



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
    return (
        <div className="flex flex-col h-screen w-full relative">
            <OverFlowList styles="pb-[300px]!" >

                <CardContainer styles="h-fit!" ImageSide={()=>( <div className=" py-3 pl-2.5 pr-3.5" > < AvatarCardLarge styles="h-[64px]! w-[64px]!"/></div>)}
                    ContentSide={()=>(<CardContent CardContentStyles="my-3!" contentHeader="fady nasser" contentInfo="." />)} 
                />

                <Divider
                    sx={{
                        color:"text-primary-250!",
                        border:"1px solid",
                        borderColor:"text-primary-250!",
                        marginLeft:8,
                        marginRight:8,
                }} />

                {SettingsAction.map((ele, idx)=>{
                    return(
                        <CardContainerNormal ImageSide={ele.ImageSide} ContentSide={ele.RightSide} key={idx} />
                    )
                })}

                <LogoutForm>
                    <CardContainerNormal  ImageSide={()=>( <div className=" py-3 pl-2.5 pr-3.5" > < LogOut/></div>)}
                        ContentSide={()=> (<CardContent CardContentStyles="my-3!" contentHeader="Logout " contentHeaderStyles="text-primary-500!"/>)} 
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
