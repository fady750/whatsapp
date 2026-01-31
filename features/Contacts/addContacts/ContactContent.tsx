
type ContactContentProps = {
    custom_name:string;
    info:string;
}

export default function ContactContent({custom_name, info}:ContactContentProps){
    return(
        <div className=" flex flex-col w-full h-full items-start justify-center" >
            <p className=" text-primary-250 text-[16px] font-normal" >{custom_name}</p>
            <p className="text-primary-50" >{info}</p>
        </div>
    )
}