"use server"

import { createContact, createProfile, getAllConversations, getAllMessagesConversation, getAllUserContact, getContact, getConversation, getProfile, sendingMessage, updateConversation, getUpdatedConversation, updateMessagesState, updateProfileName, updateProfileInfo, updateProfileImage, removeProfileImage } from "@/app/_lib/data-service";
import { validateEmail } from "@/shared/helpers";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/app/_lib/nextAuth";

import { revalidatePath, revalidateTag } from "next/cache";


// auth
export async function signInActionWithGoogle(){
    await signIn("google", {redirectTo:"/"})
}

export async function signInAction(formData:FormData){
    const email = String(formData.get("email"));
    const password =String(formData.get("password"));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;   
    // validate email
    if(!emailRegex.test(email)){
        throw new Error("email input is not valid");
    }
    //validate password
    if(password.length < 6 || password.length > 23 || !symbolRegex.test(password)){
        if(!symbolRegex.test(password)){
            throw new Error("Password must contain at least one symbol (e.g. !, @, #)");
        }
        else if(password.length < 6){
            throw new Error("Password input is too short");
        }
        else{
            throw new Error("Password input is too long");
        }
    }
    await signIn('credentials', {
        redirectTo:"/",
        email,
        password,
    })
}

export async function signUpAction(formDate:FormData){
    const name = String(formDate.get("name"));
    const email = String(formDate.get("email"));
    const password =String(formDate.get("password"));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/; 
    // validate name
    if(name.length<3 || name.length>14 ){
        if(name.length<3){
            throw new Error("name input is too short");
        }
        if(name.length>23){
            throw new Error("name input is too long");
        }
    }
    // validate email
    if(!emailRegex.test(email)){
        throw new Error("email input is not valid");
    }
    //validate password
    if(password.length < 6 || password.length > 23 || !symbolRegex.test(password)){
        if(!symbolRegex.test(password)){
            throw new Error("Password must contain at least one symbol (e.g. !, @, #)");
        }
        else if(password.length < 6){
            throw new Error("Password input is too short");
        }
        else{
            throw new Error("Password input is too long");
        }
    }
    // hashing password 
    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
        email,
        password:hashPassword,
        username:name,
    }

    await createProfile(newUser)

    await signIn('credentials', {
        redirectTo:"/",
        email,
        password,
    })

}

export async function signoutAction(){
    await signOut({
        redirectTo:"/login",
    })
}

export async function ExistProfile(email:string){
    const {state, message, user} = await getProfile(email);
    return {state, message, user};
}

// contacts

export async function createContactAction(formData:FormData){
    const firstName = String(formData.get("First Name")).trim();
    const lastName = String(formData.get("last name")).trim();
    const email = String(formData.get("email")).trim();
    const session = await auth()
    const userEmail = session?.user?.email;
    if(firstName.length == 0 || firstName.length > 13){
        if(firstName.length === 0){
            throw new Error ("this filed is required")
        }
        if(firstName.length > 13){
            throw new Error ("First name is too long");
        }
    }
    if(lastName.length == 0 || lastName.length > 13){
        if(lastName.length === 0){
            throw new Error ("this filed is required")
        }
        if(lastName.length > 13){
            throw new Error ("Last name is too long");
        }
    }
    if(!validateEmail(email)){
        throw new Error ("email input is not valid")
    }
    const {state, message} = await ExistProfile(email);
    if(state === "error"){
        throw new Error ("email is not found in DB");
    }
    if(userEmail === email){
        throw new Error ("you cannot enter you Email");
    }
    const {user} = await ExistProfile(email);
    const custom_name = firstName + " " + lastName;
    const owner_id = session?.user?.profileID;
    const contact_id = user?.id;
    const contactObject = {
        custom_name,
        owner_id,
        contact_id
    }
    await createContact(contactObject);
    revalidatePath("/");
    revalidateTag("/", "");
}

export async function getContactsAction(){
    const session = await auth();
    const profileID = session?.user?.profileID;
    const data = await getAllUserContact(profileID);
    return data;
}

export async function getContactAction(contact_id:string){
    const data =await getContact(contact_id);
    return data;
}

// conversation 

export async function getConversationAction ({currentUserId,contactId }:{currentUserId:string | undefined,contactId:string }){
    const conversation = await getConversation({currentUserId,contactId })
    return conversation
}

export async function getUpdatedConversationAction({currentUserId,contactId, conversationId }:{currentUserId:string,contactId:string, conversationId:string}){
    const updatedConversation = await getUpdatedConversation({currentUserId,contactId, conversationId });
    return updatedConversation;
}

export async function getAllConversationAction(currentUserId:string){
    const conversations = await getAllConversations(currentUserId);
    return conversations;
}



export async function updateConversationAction(conversationId:string){
    await updateConversation(conversationId);
}

// messages

export async function getAllMessagesAction(conversationId:string|undefined){
    const messages = await getAllMessagesConversation(conversationId);
    return messages;
}

export async function SendMessageAction (message:{message:{conversationId:string|undefined,senderId:string,content:string,}}){
    const data = await sendingMessage(message);
}


export async function updateMessagesStateAction({conversation_id, sender_id}:{conversation_id:string, sender_id:string}){
    await updateMessagesState({conversation_id, sender_id});
}

// profile

export async function updateProfileNameAction(name:string){
    const session = await auth();
    const userID = session?.user?.profileID;
    const newUser = await updateProfileName({name, userID});
    revalidatePath('/');
    return newUser;
}

export async function updateProfileInfoAction(info:string){
    const session = await auth();
    const userID = session?.user?.profileID;
    const newUser = await updateProfileInfo({info, userID});
    revalidatePath('/');
    return newUser;
}

export async function updateProfileImageAction(file:File){
    const session = await auth();
    const userId = session?.user?.profileID;
    const imageURL = await updateProfileImage({file, userId})
    revalidatePath('/');
    return imageURL;
}

export async function deleteProfileImageAction(){
    const session = await auth();
    const userId = session?.user?.profileID;
    const imageURL = await removeProfileImage(userId);
    return imageURL;
}