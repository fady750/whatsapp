"use client"

import { LeftArrowButton } from "@/app/_components/Icons";
import { useAppUIContext } from "@/app/_providers/AppUIProvider";
import LeftPanelHeader from "@/shared/ui/LeftPanelHeader";

export default function ContactsHeader(){
    const {setLeftPanelMode} = useAppUIContext();
    function handleClickOnArrow (){
        setLeftPanelMode("chats");
    }
    return (
        <LeftPanelHeader styles="p-2.5 justify-start" >
            <div onClick={handleClickOnArrow} className="my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer text-primary-250 hover:bg-[#2D3030] rounded-full">
                <LeftArrowButton size="large" disabled={false} />
            </div>
            <p className=" text-primary-250" >New Chat</p>
        </LeftPanelHeader>
    )
}