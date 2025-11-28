import SearchInput from "@/shared/ui/SearchInput";
import ContactsList from "./ContactsList";


export default function ContactsBody(){
    return(
        <div className="flex flex-col h-screen w-full relative">
            <SearchInput/>
            <ContactsList/>
        </div>
    )
}