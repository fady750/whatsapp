type ChatHeaderProps = {
    conversationTitle:string,
    date:string
}

export default function ChatInfoHeader({conversationTitle,date }:ChatHeaderProps){
    return(
        <div className="flex items-center overflow-hidden text-left">
            <div className="text-primary-250 flex grow font-normal text-[16px] text-left">
                <span className="whitespace-nowrap">
                    {conversationTitle}
                </span>
            </div>
            <div className="ml-[6px] mt-[3px] overflow-hidden">
                {date}
            </div>
        </div>
    )
}