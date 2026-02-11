"use client"

import IconContainer, { ActiveIconContainer } from "@/shared/ui/IconContainer";
import { ActiveSettings, Channels, Communities, Messages, MessagesActive, Settings, Status } from "@/shared/ui/Icons";
import { useSession } from "next-auth/react";
import { AvatarCardWithUrl } from "../ui/Avatar";
import {useAppUIContext} from "@/app/_providers/AppUIProvider"
import { useChatContext } from "@/app/_providers/ChatProvider";
import { memo } from "react";
import Image from "next/image";
type NavbarStateTypes = {
    panelMode : "chats" | "profile" | "settings";
}

export default function Navbar(){
    const { activeConversation} = useChatContext();
    const {setLeftPanelMode, setRightPanelMode, leftPanelMode} = useAppUIContext()
    const {data, status} = useSession();
    const user = data?.user
    function handleSetLeftPanelMode(PanelMode:NavbarStateTypes["panelMode"]){
        setLeftPanelMode(PanelMode);
        if(activeConversation === undefined && PanelMode==='chats'){
            setRightPanelMode('init');
        }
        else{
            setRightPanelMode(PanelMode);
        }
    }

    return(
        <nav className=" w-16 min-w-16 px-3 h-screen overflow-hidden bg-[#1D2020] flex flex-col justify-between items-center " >
            <SettingsTopSide/>
            <div className="flex flex-col gap items-start justify-start mb-2.5 " >
                <SettingsIcon/>
                {
                    leftPanelMode === "profile"
                    ?
                    <>
                    {
                        status === "authenticated"
                        &&
                        <ActiveIconContainer styles="text-primary-250" >
                            <AvatarCardWithUrl url={user?.avatar_url} />
                        </ActiveIconContainer>
                    }
                    </>
                    :
                    <>
                    {                        
                        status === "authenticated"
                        &&
                        <div onClick={()=>handleSetLeftPanelMode("profile")} className="my-0.5 h-10 w-10 p-1.5 cursor-pointer hover:bg-[#2D3030] rounded-full flex items-center justify-center">
                            <div className=" relative rounded-full overflow-hidden" >
                                <Image width={28} height={28} className="w-7! h-7!" alt="userImage" src={user?.avatar_url as string} />
                            </div>
                            {/* <AvatarCardWithUrl url={user?.avatar_url}/> */}
                        </div>
                    }
                    </>
                }
            </div>
        </nav>
    )
}



const SettingsTopSide = memo( 
    function TopSide(){
        const { activeConversation} = useChatContext();
        const {setLeftPanelMode, setRightPanelMode, leftPanelMode} = useAppUIContext()
        function handleSetLeftPanelMode(PanelMode:NavbarStateTypes["panelMode"]){
            setLeftPanelMode(PanelMode);
            if(activeConversation === undefined && PanelMode==='chats'){
                setRightPanelMode('init');
            }
            else{
                setRightPanelMode(PanelMode);
            }
        }
        return(
            <div onClick={()=>handleSetLeftPanelMode("chats")} className="flex flex-col gap items-start justify-start">
                {
                    leftPanelMode === "chats"
                    ?
                    <ActiveIconContainer>
                        <MessagesActive/>
                    </ActiveIconContainer>
                    :
                    <IconContainer styles="text-primary-100!" >
                        <Messages/>
                    </IconContainer>
                }
                <IconContainer>
                    <Status/>
                </IconContainer>
                <IconContainer>
                    <Channels/>
                </IconContainer>
                <IconContainer>
                    <Communities/>
                </IconContainer>
            </div>
        )
    }
)

const SettingsIcon = memo(
    function SettingsWrapper(){
        const {setLeftPanelMode, setRightPanelMode, leftPanelMode} = useAppUIContext();
        function handleSetLeftPanelMode(PanelMode:NavbarStateTypes["panelMode"]){
            setLeftPanelMode(PanelMode);
                setRightPanelMode(PanelMode);
        }
        return(
            <>
                {
                    leftPanelMode === "settings"
                    ?
                    <ActiveIconContainer styles="text-primary-250" >
                        <ActiveSettings/>
                    </ActiveIconContainer>
                    :
                    <IconContainer styles=" text-primary-100!" handleOnClick={()=>handleSetLeftPanelMode("settings")}>
                        <Settings width="24" height="24"/>
                    </IconContainer>
                }
            </>
        )
    }
)