import { Message } from "@/app/_types/ChatPrereview"
import ChatPreview from "./ChatPreview"

const conversations:Message[] =[
    {
        id:1,
        senderId:1,
        receiverId:2,
        imgURL:"../../public/img.jpeg",
        conversationTitle:"youssef nasserajkdjandjnwdanosdnqoihdqoidh",
        lastMessage:"hello this is mu first message of this application dbaskjdbajkbfdhsdbfjhbsdCHBSDkhfcbwesdhFBKhdbhjwb",
        date:"7.30pm",
        MessageStatus: "read" ,

    },
    {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
    {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
    {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
        {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
        {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
        {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
        {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"anannn",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
        {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
        {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"baba",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
    },
        {
        id:2,
        senderId:1,
        receiverId:2,
        imgURL:"@/public/img.jpeg",
        conversationTitle:"last message",
        lastMessage:"hello dad how are you",
        date:"5.45pm",
        MessageStatus: "read" ,
        }
]

export default function ChatsList(){
    return(
        <div className=" scroll-smooth flex-1 overflow-y-auto w-full flex flex-col mb-[76px]">
            {conversations.map((ele, idx)=>{
                return(
                    <ChatPreview chat={ele} key={idx}/>
                )
            })}
        </div>

    )
}