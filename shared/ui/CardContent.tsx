type CardContentProps = {
    contentHeader?:string;
    contentInfo?:string;
    contentHeaderStyles?:string;
    contentInfoStyles?:string;
    CardContentStyles?:string;
}

export function CardContent({contentHeader, contentInfo, contentHeaderStyles, contentInfoStyles, CardContentStyles}:CardContentProps){
    return(
        <div className={` flex flex-col w-full h-full items-start justify-center ${CardContentStyles}`}>
            <p className={` text-primary-250 text-[16px] font-normal ${contentHeaderStyles} `} >{contentHeader}</p>
            <p className={`text-primary-50 ${contentInfoStyles}`} >{contentInfo}</p>
        </div>
    )
}