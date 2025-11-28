import AddContactHeader from "./AddContactHeader";
import AddNewContactForm from "./AddNewContactForm";

export default function AddContact(){
    return(
        <div className="w-full" >
            <AddContactHeader/>
            <AddNewContactForm/>
        </div>
    )
}