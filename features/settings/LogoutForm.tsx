import {signoutAction} from "@/app/_lib/action"


type LogoutFormProps = {
    children : React.ReactNode;
}

export default function LogoutForm({children}:LogoutFormProps){
    return(
        <form className="w-full" action={signoutAction}>
            <button className="w-full" >
                {children}
            </button>
        </form>
    )
}