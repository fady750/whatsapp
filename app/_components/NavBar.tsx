'use client'
import { Channels, Communities, LogOut, Messages, Settings, Status } from "@/app/_components/Icons";
import { signoutAction } from "@/app/_lib/action";
import { useAppContext } from "./AppContext";
import { LeftPanelState } from "@/app/_types/Components";
import { AvatarCardLarge } from "@/shared/ui/Avatar";

type NavbarStateTypes = {
    panelMode : "chats" | "profile" | "settings";
}

export default function NavBar(){
    const {setLeftPanelMode, setRightPanelMode, activeConversation} = useAppContext();
    
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
        <nav className="box-content w-16 px-3 h-screen overflow-hidden bg-[#1D2020] flex flex-col justify-between items-center " >
            <div onClick={()=>handleSetLeftPanelMode("chats")} className="flex flex-col gap items-start justify-start">
                <div className="my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-[#2D3030] bg-[#2D3030] rounded-full">
                    <Messages/>
                </div>
                <div className="my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-[#2D3030]  rounded-full">
                    <Status/>
                </div>
                <div className="my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full">
                    <Channels/>
                </div>
                <div className="my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full">
                    <Communities  />
                </div>
            </div>
            
            <div className="flex flex-col gap items-start justify-start" >
                <div className="my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full" onClick={()=>handleSetLeftPanelMode("settings")} >
                    <Settings/>
                </div>
                <div onClick={()=>handleSetLeftPanelMode("profile")} className="my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full">
                    <AvatarCardLarge styles="h-[28px]! w-[28px]!" />
                </div>
            </div>
        </nav>
    )
}