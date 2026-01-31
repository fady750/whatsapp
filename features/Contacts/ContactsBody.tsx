import SearchInput from "@/shared/ui/SearchInput";
import ContactsList from "./ContactsList";
import {contact} from "@/app/_types/Components"

type ContactsBodyProps = {
    contacts : contact[] | null;
}

export default function ContactsBody({contacts}:ContactsBodyProps){
    return(
        <div className="flex flex-col h-screen w-full relative">
            <SearchInput/>
            <ContactsList contacts={contacts} />
        </div>
    )
}