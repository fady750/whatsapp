"use client"
import { useAppContext } from "@/app/_components/AppContext";

import { AvatarCreateContact } from "@/shared/ui/Avatar";
import {CardContainerBase} from "@/shared/ui/CardContainer";
import AddContactContent from "./AddContactContent";

export default function AddContacts(){
    const {setLeftPanelMode} = useAppContext()
    function handleSetLeftPanelMode(){
        setLeftPanelMode("newContact")
    }
    return(
        <div className=" w-full h-full items-start" onClick={handleSetLeftPanelMode} >
            <CardContainerBase ImageSide={AvatarCreateContact} ContentSide={AddContactContent}/>
        </div>
    )
}