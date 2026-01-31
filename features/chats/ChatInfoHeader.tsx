type ChatHeaderProps = {
    conversationTitle:string,
    date:string,
}

function get12HourFormatWithMinutes(timestamp:string) {
  const date = new Date(timestamp);
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Determine AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Format minutes to always show 2 digits (e.g., 05, 09, etc.)
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
}

export default function ChatInfoHeader({conversationTitle,date}:ChatHeaderProps){
    return(
        <div className="flex items-center overflow-hidden text-left">
            <div className="text-primary-250 flex grow font-normal text-[16px] text-left">
                <span className="whitespace-nowrap">
                    {conversationTitle}
                </span>
            </div>
            <div className="mt-[3px] overflow-hidden">
                { get12HourFormatWithMinutes(date)}
            </div>
        </div>
    )
}