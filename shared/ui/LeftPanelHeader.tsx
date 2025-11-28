import React from "react"

type PageHeaderProps = {
    children : React.ReactNode;
    styles?: string;
}

export default function LeftPanelHeader({children, styles}:PageHeaderProps){
    return(
        <header className={`${styles} flex items-center h-base w-full`} >
            {children}
        </header>
    )
}