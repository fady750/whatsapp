"use client"

import { useAppUIContext } from "@/app/_providers/AppUIProvider";
import { AvatarCreateContact } from "@/shared/ui/Avatar";
import { CardContainerBase } from "@/shared/ui/CardContainer";
import AddContactContent from "./AddContactContent";

export default function AddContacts(){
    const {setLeftPanelMode} = useAppUIContext()
    function handleSetLeftPanelMode(){
        setLeftPanelMode("newContact")
    }
    return(
        <div className=" w-full h-normal items-start" onClick={handleSetLeftPanelMode} >
            <CardContainerBase ImageSide={AvatarCreateContact} ContentSide={AddContactContent}/>
        </div>
    )
}