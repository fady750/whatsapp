"use client"

import IconContainer from '@/shared/ui/IconContainer';
import { EmailIcon, UserIcon } from "@/shared/ui/Icons";
import TextField from '@mui/material/TextField';
import { InputAndIconContainer } from '@/shared/ui/InputContainer';
import { createContactAction, ExistProfile } from '@/app/_lib/action';
import { useState } from 'react';
import {validateEmail} from "@/shared/helpers"
import ErrorInputMessage from '@/shared/ui/errorInputMessage';
import { useSession } from 'next-auth/react';
import { useAppUIContext } from '@/app/_providers/AppUIProvider';

type InputError = {
    firstName?:string;
    lastName?:string;
    email?:string
}


export default function AddNewContactForm(){
    const {data, status} = useSession();
    const {setLeftPanelMode} = useAppUIContext();
    const [errors, setErrors] = useState<InputError>({});
    if(status !== "authenticated") return null;
    const {user} = data;
    const userEmail = user?.email;
    async function handleSubmit(formData:FormData){
        let flag = false; 
        const obj:InputError = {}
        const firstName = String(formData.get("First Name")).trim();
        const lastName = String(formData.get("last name")).trim();
        const email = String(formData.get("email")).trim();
        if(firstName.length == 0 || firstName.length > 13){
            if(firstName.length === 0){
                flag = true;
                obj.firstName = "this filed is required"
            }
            if(firstName.length > 13){
                flag = true;
                obj.firstName = "First name is too long";
            }
        }
        if(lastName.length == 0 || lastName.length > 13){
            if(lastName.length === 0){
                flag = true;
                obj.lastName = "this filed is required"
            }
            if(lastName.length > 13){
                flag = true;
                obj.lastName = "Last name is too long";
            }
        }
        if(!validateEmail(email)){
            flag = true;
            obj.email = "email input is not valid"
        }
        const {state, message} = await ExistProfile(email);
        if(state === "error"){
            flag = true;
            obj.email = "email is not found in DB";
        }
        if(userEmail === email){
            flag = true;
            obj.email = "you cannot enter you Email";
        }
        if(flag){
            setErrors((e)=>{return obj});
            return;
        }
        await createContactAction(formData);
        setLeftPanelMode("contacts");
    }

    return(
        <form className='flex pt-6 flex-col items-center gap-8 text-primary-250 w-full' action={handleSubmit} >
                
                <InputAndIconContainer>
                    <IconContainer styles='items-end!' >
                        <UserIcon/>
                    </IconContainer>
                    <div className=' w-full flex flex-col gap-2'>
                        <TextField
                            variant="standard"
                            fullWidth
                            color="success"
                            label="First Name"
                            name='First Name'
                            required
                            // onChange={}
                            InputProps={{
                                classes: {
                                    input: "text-primary-250!",
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--my-input-border)",
                                    "&.Mui-focused": { color: "var(--my-input-border-active)" },
                                    "&.MuiInputLabel-shrink": { color: "var(--my-input-border-active)" },
                                    "&:hover": { color: "var(--my-input-border-active)" },
                                }
                            }}
                            sx={{
                                "& .MuiInput-root": {
                                "&:before": {
                                    borderBottomColor: "var(--my-input-border)",  
                                    borderBottomWidth:"2px"
                                },
                                "&:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--my-input-border-active)",
                                },
                                "&.Mui-focused:after": {
                                    borderBottomColor: "var(--my-input-border-active)", 
                                },
                                },
                            }}
                        />
                        <ErrorInputMessage errorMessage={errors?.firstName} />
                    </div>
                </InputAndIconContainer>
                <InputAndIconContainer>
                    <IconContainer styles='invisible!' >
                        <UserIcon/>
                    </IconContainer>
                    <div className=' w-full flex flex-col gap-2' >
                        <TextField
                            variant="standard"
                            fullWidth
                            required
                            color="success"
                            label="Last Name"
                            name='last name'
                            InputProps={{
                                classes: {
                                    input: "text-primary-250!",
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--my-input-border)",
                                    "&.Mui-focused": { color: "var(--my-input-border-active)" },
                                    "&.MuiInputLabel-shrink": { color: "var(--my-input-border-active)" },
                                    "&:hover": { color: "var(--my-input-border-active)" },
                                }
                            }}
                            sx={{
                                "& .MuiInput-root": {
                                "&:before": {
                                    borderBottomColor: "var(--my-input-border)",  
                                    borderBottomWidth:"2px"
                                },
                                "&:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--my-input-border-active)",
                                },
                                "&.Mui-focused:after": {
                                    borderBottomColor: "var(--my-input-border-active)", 
                                },
                                },
                            }}
                        />
                        <ErrorInputMessage errorMessage={errors?.lastName}  />
                    </div>
                </InputAndIconContainer>
                <InputAndIconContainer>
                    <IconContainer styles='items-end!' >
                        <EmailIcon/>
                    </IconContainer>
                    <div className=' w-full flex flex-col gap-2' >
                        <TextField
                                variant="standard"
                                fullWidth
                                color="success"
                                label="Email"
                                name="email"
                                InputProps={{
                                    classes: {
                                        input: "text-primary-250!",
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: "var(--my-input-border)",
                                        "&.Mui-focused": { color: "var(--my-input-border-active)" },
                                        "&.MuiInputLabel-shrink": { color: "var(--my-input-border-active)" },
                                        "&:hover": { color: "var(--my-input-border-active)" },
                                    }
                                }}
                                sx={{
                                    "& .MuiInput-root": {
                                    "&:before": {
                                        borderBottomColor: "var(--my-input-border)",  
                                        borderBottomWidth:"2px"
                                    },
                                    "&:hover:not(.Mui-disabled):before": {
                                        borderBottomColor: "var(--my-input-border-active)",
                                    },
                                    "&.Mui-focused:after": {
                                        borderBottomColor: "var(--my-input-border-active)", 
                                    },
                                    },
                                }}
                        />
                        <ErrorInputMessage errorMessage={errors.email} />
                    </div>
                </InputAndIconContainer>
                <button type='submit' className=' hidden' ></button>
        </form>
    )
}