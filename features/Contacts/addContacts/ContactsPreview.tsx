import {AvatarCard} from "@/shared/ui/Avatar"
import {CardContainerBase} from "@/shared/ui/CardContainer"
import ContactContent from "@/features/Contacts/addContacts/ContactContent"


export default function ContactsPreview (){
    return(
        <CardContainerBase ImageSide={AvatarCard} ContentSide={ContactContent} />
    )
}