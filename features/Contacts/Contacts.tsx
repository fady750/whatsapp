import ContactsBody from "./ContactsBody";
import ContactsHeader from "./ContactsHeader";
import {contact} from "@/app/_types/Components"

type ContactsProps = {
    contacts : contact[] | null;
}

export default function Contacts({contacts}:ContactsProps){
    return (
        <>
            <ContactsHeader/>
            <ContactsBody contacts={contacts} />
        </>
    )
}