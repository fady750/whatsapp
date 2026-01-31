import { Pencel, True } from "@/shared/ui/Icons";
import { useEffect, useRef, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { updateProfileInfoAction } from "@/app/_lib/action";

export default function ChangeInfo({info}:{info:string|undefined}){
    const [infoIsFocused, setInfoIsFocused] = useState(false);
    const [infoValue, setInfoValue] = useState(info);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { update } = useSession();

    const focusInfoInput = () => {
        textareaRef.current?.focus();
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        // Don't focus if clicking on the button
        const target = e.target as HTMLElement;
        if (target.closest('button')) {
            return;
        }
        focusInfoInput();
    };

    async function handleUpdateInfo(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (infoValue !== undefined) {
            try {
                // Update session token and cookies - this triggers the JWT callback
                await updateProfileInfoAction(infoValue);
                await update({
                    user: {
                        info: infoValue,
                    }
                });
                
                // Remove focus after updating
                textareaRef.current?.blur();
            } catch (error) {
                console.error("Error updating info:", error);
            }
        }
    }

    async function handleUpdateInfoFromButton(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        
        if (infoValue !== undefined) {
            try {
                // Update session token and cookies - this triggers the JWT callback
                await updateProfileInfoAction(infoValue);
                await update({
                    user: {
                        info: infoValue,
                    }
                });
                
                // Remove focus after updating
                textareaRef.current?.blur();
            } catch (error) {
                console.error("Error updating info:", error);
            }
        }
    }
    
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                // Remove focus from textarea
                textareaRef.current?.blur();
                // Reset input value to original info
                setInfoValue(info);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [info]);

    return(
        <form onSubmit={handleUpdateInfoFromButton} >
            <div className="flex flex-col items-start px-[30px] pt-3.5 pb-2.5 gap-3 mb-2.5" >
                <p className="text-primary-50 font-medium" >About</p>
                <div 
                    ref={containerRef} 
                    onClick={handleContainerClick}
                    className={` w-full flex items-center justify-between ${infoIsFocused && "border-b-2 border-primary-200"} `} 
                >
                    <input 
                        ref={textareaRef}
                        onFocus={()=>setInfoIsFocused(true)} 
                        onBlur={()=>setInfoIsFocused(false)} 
                        className={` text-primary-250 outline-none w-full pb-2 resize-none min-h-[20px] max-h-[200px] overflow-y-auto`} 
                        value={infoValue || ''} 
                        onChange={(e)=>setInfoValue(e.target.value)}
                        rows={1}
                        style={{
                            height: 'auto',
                            minHeight: '20px',
                        }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                        }}
                    />
                    {
                        !infoIsFocused ? 
                        <div onClick={(e) => {
                            e.stopPropagation();
                            focusInfoInput();
                        }} className=" cursor-pointer text-primary-100 w-fit" >
                            <Pencel/>
                        </div> 
                        :
                        <button 
                            onClick={handleUpdateInfoFromButton} 
                            type="button" 
                            className=" cursor-pointer text-primary-100 w-fit" 
                        >
                            <True/>
                        </button> 
                    }
                </div>
            </div>
            <button className="hidden" type="submit"></button>
        </form>
    )
}