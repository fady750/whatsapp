type OverFlowListProps = {
    children : React.ReactNode;
    styles?:string;
}

export  function OverFlowList({children, styles}:OverFlowListProps){
    return(
        <div className={` scroll-smooth flex-1 overflow-y-auto w-full flex flex-col gap-3 mb-[76px] ${styles}`}>    
            {children}
        </div>
    )
}