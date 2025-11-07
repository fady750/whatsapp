'use client'
import { Channels, Communities, Messages, Settings, Status } from "@/app/_components/Icons";

export default function NavBar(){
    return(
        <nav className="py-[10px] w-[64px] px-[12px] h-screen overflow-y-hidden bg-[#1D2020] flex flex-col justify-between items-center " >
            <div className="flex flex-col gap-[4px] items-start justify-start">
                <div className="my-[2px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2D3030] bg-[#2D3030] rounded-full">
                    <Messages/>
                </div>
                <div className="my-[2px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2D3030]  rounded-full">
                    <Status/>
                </div>
                <div className="my-[2px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full">
                    <Channels/>
                </div>
                <div className="my-[2px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full">
                    <Communities  />
                </div>
            </div>
            <div className="flex flex-col gap-[4px] items-start justify-start" >
                <div className="my-[2px] h-[40px] w-[40px] flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full">
                    <Settings />
                </div>
            </div>
        </nav>
    )
}