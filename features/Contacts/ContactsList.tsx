import { CardContainerNormal } from "@/shared/ui/CardContainer";
import AddContacts from "./addContacts/AddContactButton";
import ContactContent from "./addContacts/ContactContent";
import {AvatarCard} from "@/shared/ui/Avatar"
import { OverFlowList } from "@/shared/ui/OverFlowList";

export default function ContactsList(){
    return(
        <OverFlowList>
            <AddContacts/>
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
            <CardContainerNormal ImageSide={AvatarCard} ContentSide={ContactContent} />
        </OverFlowList>
    )
}