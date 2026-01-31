type IconContainerProps = {
    children:React.ReactNode;
    styles?:string;
    handleOnClick?:()=>void;
}

export default function IconContainer ({children, styles, handleOnClick=()=>{}}:IconContainerProps){
    return(
        <div onClick={handleOnClick} className={`my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-[#2D3030] rounded-full transition duration-200 ${styles} `}>
            {children}
        </div>
    )
}

export function ActiveIconContainer({children, styles, handleOnClick=()=>{}}:IconContainerProps){
    return(
        <div onClick={handleOnClick} className={`my-0.5 h-10 w-10 flex items-center justify-center cursor-pointer bg-[#2D3030] rounded-full transition duration-200 ${styles} `}>
            {children}
        </div>
    )
}
