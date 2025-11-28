"use client"
import { signUpAction } from "@/app/_lib/action"
import { useState } from "react"
import SpinnerMini from "../_components/SpinnerMini";
import { auth } from "../_lib/auth";
type errorsTypes = {
    nameErrorMessage:string
    emailErrorMessage:string,
    passwordErrorMessage:string,
}

export  default  function SignupForm (){
    // const session = await auth();
    const [errors, setErrors] = useState<errorsTypes>({
        nameErrorMessage:"",
        emailErrorMessage:"",
        passwordErrorMessage:"",
    });
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false)


    async function handleSubmit(formData:FormData){
        setErrors({
            emailErrorMessage:"",
            passwordErrorMessage:"",
            nameErrorMessage:"",
        })
        const name = nameInput
        const email = emailInput
        const password =passwordInput
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        // validate name
        if(name.length<3 || name.length>14 ){
            if(name.length<3){
                setErrors((e)=>{ return {...e,nameErrorMessage:"name input is too short"} })
                return ;
            }
            if(name.length>23){
                setErrors((e)=>{ return {...e,nameErrorMessage:"name input is too long"} })
                return ;
            }
        }
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
        await signUpAction(formData);
        setIsLoading(false);
    }

    return(
        <form className=" flex flex-col gap-4 w-[360px]" action={handleSubmit}  >
            <div className=" w-full flex flex-col items-center justify-center gap-[2px] mb-3 " >
                <input required className=" w-full h-11 px-3 border rounded-lg mb-2 border-primary-100 outline-none" type="text" name="name" value={nameInput} onChange={(e)=>setNameInput(e.target.value)}  placeholder="Enter your name" />
                <p className=" text-base text-red-700 text-left w-full" >{errors?.nameErrorMessage}</p>
            </div>
            <div className=" w-full" >
                <input required className=" w-full h-11 px-3 border rounded-lg mb-2 border-primary-100 outline-none" type="email" name="email" value={emailInput} onChange={(e)=>setEmailInput(e.target.value)} placeholder="Email or phone number" />
            </div>
            <div className=" w-full">
                <input required className=" w-full h-11 px-3 border rounded-lg mb-2 border-primary-100 outline-none" type="password" name="password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)} placeholder="Password"/>
            </div>
            <button disabled={isLoading} className="w-full h-11 font-semibold rounded-lg mt-2 hover:bg-[#1EBE5C] cursor-pointer flex items-center justify-center bg-primary-200" >
                {
                    isLoading
                    ?
                    <SpinnerMini/>
                    :
                    "Sign Up"
                }
            </button>
        </form>
    )
}