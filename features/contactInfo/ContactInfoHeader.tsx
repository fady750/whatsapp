import { useAppUIContext } from "@/app/_providers/AppUIProvider";
import IconContainer from "@/shared/ui/IconContainer";
import {Close, Pencel} from "@/shared/ui/Icons"

export default function ContactInfoHeader(){
    const {setRightPanelMode} = useAppUIContext();
    function handleOnClick(){
        setRightPanelMode("chats");
    }
    return(
        <header className="p-2.5 flex items-center justify-between" >
            <div className="text-primary-250 flex items-center text-base" >
                <IconContainer handleOnClick={handleOnClick} styles="h-10 w-10" >
                    <Close/>
                </IconContainer>
                <p>contact info</p>
            </div>
            <IconContainer  styles="text-primary-250" >
                <Pencel/>
            </IconContainer>
        </header>
    )
}