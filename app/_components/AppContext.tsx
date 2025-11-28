"use client"

import { createContext, useContext, useState } from "react"
import {LeftPanelState} from "@/app/_types/Components"

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextType = {
  leftPanelMode: LeftPanelState["mode"];
  setLeftPanelMode: React.Dispatch<React.SetStateAction<LeftPanelState["mode"]>>;
};

type AppProviderProps = {
    children:React.ReactNode
}

function AppProvider({children}:AppProviderProps){
    const [leftPanelMode, setLeftPanelMode]  = useState<LeftPanelState["mode"]>("chats")
    return(
        <AppContext.Provider value={{leftPanelMode, setLeftPanelMode}} >
            {children}
        </AppContext.Provider>
    )
}

function useAppContext () {
    const context = useContext(AppContext);
    if(context === undefined) {
        throw new Error("Context was used outside provider");
    }
    return context;
}

export {AppProvider, useAppContext}