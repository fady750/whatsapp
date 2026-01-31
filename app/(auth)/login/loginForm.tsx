"use client"

import { useState } from "react";
import {signInAction} from "@/app/_lib/action"
import SpinnerMini from "@/app/_components/SpinnerMini";

type errorsTypes = {
    emailErrorMessage:string,
    passwordErrorMessage:string,
}

export default function LoginForm(){
        const [errors, setErrors] = useState<errorsTypes>({
            emailErrorMessage:"",
            passwordErrorMessage:"",
        });
        const [emailInput, setEmailInput] = useState<string>("");
        const [passwordInput, setPasswordInput] = useState<string>("");
        const [isLoading, setIsLoading] = useState(false)
        async function handleSubmit(formData:FormData){
            setErrors({
                emailErrorMessage:"",
                passwordErrorMessage:"",
            })
            const email = emailInput
            const password =passwordInput
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
            // validate email
            if(!emailRegex.test(email)){
                    setErrors((e)=>{ return {...e,emailErrorMessage:"email input is not valid"} })
                    return ;
            }
            // validate password what i need to validate inside password be more than 6 and less than 23 and contains any symbols 
            if(password.length < 6 || password.length > 23 || !symbolRegex.test(password)){
                if(!symbolRegex.test(password)){
                    setErrors((e)=>{ return {...e,passwordErrorMessage:"Password must contain at least one symbol (e.g. !, @, #)"} })
                    return;
                }
                else if(password.length < 6){
                    setErrors((e)=>{ return {...e,passwordErrorMessage:"Password input is too short"} })
                    return;
                }
                else{
                    setErrors((e)=>{ return {...e,passwordErrorMessage:"Password input is too long"} })
                    return;
                }
            }
            setIsLoading(true);
            await signInAction(formData);
            setIsLoading(false);
        }
    return(
        <form className=" flex flex-col gap-4 w-[360px]" action={handleSubmit} >
            <div className=" w-full" >
                <input required className=" w-full h-11 px-3 border rounded-lg mb-2 border-primary-100 outline-none" type="email" name="email" value={emailInput} onChange={(e)=>setEmailInput(e.target.value)} placeholder="Email or phone number" />
                <p className=" text-base text-red-700 text-left w-full" >{errors?.emailErrorMessage}</p>
            </div>
            <div className=" w-full">
                <input required className=" w-full h-11 px-3 border rounded-lg mb-2 border-primary-100 outline-none" type="password" name="password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)} placeholder="Password"/>
                <p className=" text-base text-red-700 text-left w-full" >{errors?.passwordErrorMessage}</p>
            </div>
            <button disabled={isLoading} className="w-full h-11 font-semibold rounded-lg mt-2 hover:bg-[#1EBE5C] cursor-pointer flex items-center justify-center bg-primary-200" >
                {
                    isLoading
                    ?
                    <SpinnerMini/>
                    :
                    "Login"
                }
            </button>
        </form>
    )
}