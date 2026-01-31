import { Star , NotificationIcon, Clock, Shield, LockIcon, Favorite, Block, Dislike, Trash, Media} from "@/shared/ui/Icons"
import { CardContent, CardContentDanger } from "@/shared/ui/CardContent"
import { CardContainer } from "@/shared/ui/CardContainer"
import { Divider } from "@mui/material"

const ContactInfoActionArray = [
    {
        ImageSide:()=>(<div className=" flex items-center w-10 h-10"><Star/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Started messages"/>)
    },
    {
        ImageSide:()=>(<div className=" flex items-center w-10 h-10"><NotificationIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Mute notifications"/>)
    },
    {
        ImageSide:()=>(<div className=" flex items-center w-10 h-10"><Clock/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Disappearing messages" contentInfo="Off"/>)
    },
    {
        ImageSide:()=>(<div className=" flex items-center w-10 h-10"><Shield/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Advance Chat Privacy" contentInfo="Off"/>)
    },
    {
        ImageSide:()=>(<div className=" flex items-center w-10 h-10"><LockIcon/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Encryption" contentInfo="Messages are end-to-end encrypted. Click to verify."/>)
    },
]

const ContactInfoActionArrayDash = [
    {
        ImageSide:()=>(<div className=" flex items-center w-10 h-10"><Favorite/></div>),
        RightSide:()=>(<CardContent CardContentStyles="my-3!" contentHeader="Add to favorites"/>)
    },
]




export default function ContactInfoAction(){
    const ContactInfoActionArrayDanger = [
        {
            ImageSide:()=>(<div className=" flex items-center w-10 h-10"><Block/></div>),
            RightSide:()=>(<CardContentDanger CardContentStyles="my-3!" contentHeader="Block"/>)
        },
        {
            ImageSide:()=>(<div className=" flex items-center w-10 h-10"><Dislike/></div>),
            RightSide:()=>(<CardContentDanger CardContentStyles="my-3!" contentHeader="Report"/>)
        },
        {
            ImageSide:()=>(<div className=" flex items-center w-10 h-10"><Trash/></div>),
            RightSide:()=>(<CardContentDanger CardContentStyles="my-3! " contentHeader="Delete chat"/>)
        },
    ]

    return(
        <div>
            <Divider    
            sx={{
                        color:"text-primary-250!",
                        border:"1px solid",
                        borderColor:"text-primary-250!",
                        marginLeft:4,
                        marginRight:4,
                        marginY:0.1,
            }} />
            <CardContainer styles="px-5 py-2.5 mt-1" ImageSide={()=><div className=" flex items-center w-10 h-10 text-primary-250 "> <Media/> </div>} ContentSide= {()=>(<CardContent CardContentStyles="my-3! " contentHeader="Media, links and docs"/>)}/>
            <Divider    
                    sx={{
                        color:"text-primary-250!",
                        border:"1px solid",
                        borderColor:"text-primary-250!",
                        marginLeft:4,
                        marginRight:4,
                        marginY:0.1,
            }} />
            {ContactInfoActionArray.map((ele, idx) => <CardContainer styles="px-5 py-2.5 mt-1" ImageSide={ele.ImageSide} ContentSide= {ele.RightSide} key={idx} /> )}
            
            <Divider    
                    sx={{
                        color:"text-primary-250!",
                        border:"1px solid",
                        borderColor:"text-primary-250!",
                        marginLeft:4,
                        marginRight:4,
                        marginY:5,
            }} />
            
            {ContactInfoActionArrayDash.map((ele, idx) => <CardContainer styles="px-5 py-2.5" ImageSide={ele.ImageSide} ContentSide= {ele.RightSide} key={idx} /> )}
            
            <div className=" text-primary-500" >
                {ContactInfoActionArrayDanger.map((ele, idx) => <CardContainer styles="px-5 py-2.5 text-primary-500!"  ImageSide={ele.ImageSide} ContentSide={ele.RightSide} key={idx} /> )}
            </div>
            
        </div>
    )
}