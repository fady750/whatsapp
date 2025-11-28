"use server"

import { createProfile } from "@/app/_lib/data-service";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "./auth";

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