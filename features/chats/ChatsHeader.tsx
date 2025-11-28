import { WhatsAppIcon } from "@/shared/ui/Icons";
import ChatsHeaderActions from "./ChatsHeaderActions";
import LeftPanelHeader from "@/shared/ui/LeftPanelHeader";

export default function ChatsHeader(){
    return(
        <LeftPanelHeader styles="justify-center p-5" >
            <div className=" grow overflow-x-hidden" >
                <span className="text-white font-medium text-[1.25rem]" >
                    <WhatsAppIcon/>
                </span>
            </div>
            <ChatsHeaderActions/>
        </LeftPanelHeader>
    )
}