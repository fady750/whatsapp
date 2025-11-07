import ChatsHeader from "@/app/_components/ChatsHeader"
import ChatsBody from "./ChatsBody"

export default function ChatsPanel(){
    return(
        <div className=" max-w-[40%] min-w-[336px] flex-[0_0_40%] grow  pl-px bg-[#3C3F3F] flex flex-col h-screen " >
            <div className="flex  relative grow flex-wrap h-screen bg-[#171717]" >
                <ChatsHeader/>
                <ChatsBody/>
            </div>
        </div>
    )
}