"use client"
import { LeftPanelState, RightPanelState } from "@/app/_types/Components";
import { createContext, useContext, useState } from "react";

const AppUIContext = createContext<AppUIContextType | undefined>(undefined);

type AppUIContextType = {
    leftPanelMode: LeftPanelState["mode"];
    setLeftPanelMode: React.Dispatch<React.SetStateAction<LeftPanelState["mode"]>>;
    rightPanelMode:RightPanelState["mode"];
    setRightPanelMode: React.Dispatch<React.SetStateAction<RightPanelState["mode"]>>;
};

type AppUIProviderProps = {
    children:React.ReactNode
}

function AppUIProvider({children, }:AppUIProviderProps){

    const [leftPanelMode, setLeftPanelMode]  = useState<LeftPanelState["mode"]>("chats");
    const [rightPanelMode, setRightPanelMode]  = useState<RightPanelState["mode"]>("init");
    return(
        <AppUIContext.Provider value={{leftPanelMode, setLeftPanelMode, rightPanelMode, setRightPanelMode}} >
            {children}
        </AppUIContext.Provider>
    )
}

function useAppUIContext () {
    const context = useContext(AppUIContext);
    if(context === undefined) {
        throw new Error("Context was used outside provider");
    }
    return context;
}

export { AppUIProvider, useAppUIContext };
