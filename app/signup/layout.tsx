import { Metadata } from "next";

export const metadata:Metadata = {
    title:"signup",
}



export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return(
        <div className="h-screen w-full" >
            {children}
        </div>
    )
}