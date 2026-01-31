import { useAppUIContext } from "@/app/_providers/AppUIProvider";
import IconContainer from "@/shared/ui/IconContainer";
import {LeftArrowButton} from "@/shared/ui/Icons"
import LeftPanelHeader from "@/shared/ui/LeftPanelHeader";

export default function AddContactHeader(){
    const {setLeftPanelMode} = useAppUIContext();
    function handleSetLeftPanelMode(){
        setLeftPanelMode("contacts");
    }
    return(
        <LeftPanelHeader styles="mb-12 p-2.5" >
            <IconContainer handleOnClick={handleSetLeftPanelMode} >
                <LeftArrowButton size="large" disabled={false}/>
            </IconContainer>
            <p className=" font-normal text-base text-primary-250" >New Contact</p>
        </LeftPanelHeader>
    )
}