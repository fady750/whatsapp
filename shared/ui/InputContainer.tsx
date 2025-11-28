type InputContainerProps = {
    children:React.ReactNode;
}

export function InputAndIconContainer({children}:InputContainerProps){
    return(
            <div className=' w-full flex items-center gap-3 px-[25px] '>    
                {children}
            </div>
    )
}