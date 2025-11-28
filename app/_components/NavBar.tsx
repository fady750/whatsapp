'use client'
import { Channels, Communities, LogOut, Messages, Settings, Status } from "@/app/_components/Icons";
import { signoutAction } from "@/app/_lib/action";
import { useAppContext } from "./AppContext";
import { LeftPanelState } from "@/app/_types/Components";
import { AvatarCardLarge } from "@/shared/ui/Avatar";
export default function NavBar(){
    const {setLeftPanelMode} = useAppContext();
    function handleSetLeftPanelMode(leftPanelMode:LeftPanelState["mode"]){
        setLeftPanelMode(leftPanelMode);
    }
    return(
        <nav className="py-2.5 w-16 px-3 h-screen overflow-y-hidden bg-[#1D2020] flex flex-col justify-between items-center " >
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
                    {/* <form action={signoutAction} >
                        <button type="submit" >
                            <LogOut/>
                        </button>
                    </form> */}
                    <AvatarCardLarge styles="h-[28px]! w-[28px]!" />
                </div>
            </div>
        </nav>
    )
}