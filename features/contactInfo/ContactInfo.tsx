import ContactInfoHeader from "./ContactInfoHeader";
import { OverFlowList } from "@/shared/ui/OverFlowList";
import ContactInfoContent from "./ContantInfoContent";
import ContactInfoAction from "./ContactInfoActions";
import {activeConversation} from "@/app/_types/Components"

export default function ContactInfo({activeConversation}:{activeConversation:activeConversation}){
    return(
        <div className="flex flex-col h-screen w-full relative " >
            <ContactInfoHeader/>
            <OverFlowList styles="pb-[100px]!">
                <ContactInfoContent activeConversation={activeConversation}/>
                <ContactInfoAction/>
            </OverFlowList>
        </div>
    )
}