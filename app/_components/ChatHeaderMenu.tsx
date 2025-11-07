import {Video, SearchIcon, MenuIcon} from "./ChatIcons"
export default function ChatHeaderMenu(){
    return(
        <div className=" ml-auto basis-auto shrink-0 grow-0" >
            <div className=" flex items-center ml-5" >
                <Video/>
                <SearchIcon/>
                <MenuIcon/>
            </div>
        </div>
    )
}