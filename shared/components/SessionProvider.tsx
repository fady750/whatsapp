"use client"
import { SessionProvider } from "next-auth/react";

type SessionProviderProps = {
    children : React.ReactNode;
}
export default function SessionProviderFunction({children}:SessionProviderProps){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}