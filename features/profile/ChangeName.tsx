import { updateProfileNameAction } from "@/app/_lib/action";
import { Pencel, True } from "@/shared/ui/Icons";
import { useEffect, useRef, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";

export default function ChangeName({name}:{name:string|undefined}){
    const [nameIsFocused, setNameIsFocused] = useState(false);
    const [nameValue, setNameValue] = useState(name);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { update } = useSession();

    const focusNameInput = () => {
        inputRef.current?.focus();
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        // Don't focus if clicking on the button
        const target = e.target as HTMLElement;
        if (target.closest('button')) {
            return;
        }
        focusNameInput();
    };

    async function  handleUpdateName(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (nameValue) {
            try {
                // Update database first
                await updateProfileNameAction(nameValue);
                
                // Update session token and cookies - this triggers the JWT callback
                await update({
                    user: {
                        username: nameValue,
                    }
                });
                
                // Remove focus after updating
                inputRef.current?.blur();
            } catch (error) {
                console.error("Error updating name:", error);
            }
        }
    }
    
    async function handleUpdateNameFromButton(e: React.MouseEvent) {
        console.log("update name from button");
        e.preventDefault();
        e.stopPropagation();
        
        if (nameValue) {
            try {
                // Update database first
                await updateProfileNameAction(nameValue);
                
                // Update session token and cookies - this triggers the JWT callback
                await update({
                    user: {
                        username: nameValue,
                    }
                });
                
                // Remove focus after updating
                inputRef.current?.blur();
            } catch (error) {
                console.error("Error updating name:", error);
            }
        }
    }
    
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                // Remove focus from input
                inputRef.current?.blur();
                // Clear the ref (reset input value to original name)
                setNameValue(name);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [name]);

    return(
        <form onSubmit={handleUpdateName} >
            <div className="flex flex-col items-start px-[30px] pt-3.5 pb-2.5 gap-3 mb-2.5" >
                    <p className="text-primary-100 font-medium" >Name</p>
                    <div 
                        ref={containerRef} 
                        onClick={handleContainerClick}
                        className={` w-full flex items-center justify-between ${nameIsFocused && "border-b-2 border-primary-200"} `} 
                    >
                        <input 
                            ref={inputRef}
                            onFocus={()=>setNameIsFocused(true)} 
                            onBlur={()=>setNameIsFocused(false)} 
                            className={` text-primary-250 outline-none w-full pb-2 `} 
                            value={nameValue} 
                            onChange={(e)=>setNameValue(e.target.value)}
                        />
                        {
                            !nameIsFocused ? 
                            <div onClick={(e) => {
                                e.stopPropagation();
                                focusNameInput();
                            }} className=" cursor-pointer text-primary-100 w-fit" >
                                <Pencel/>
                            </div> 
                            :
                            <button 
                                onClick={handleUpdateNameFromButton} 
                                type="button" 
                                className=" cursor-pointer text-primary-100 w-fit" 
                            >
                                <True/>
                            </button> 
                        }
                    </div>
            </div>
            <button className="hidden"></button>
        </form>
    )
}