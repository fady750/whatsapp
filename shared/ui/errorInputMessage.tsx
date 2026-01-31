type ErrorInputMessageProps = {
    errorMessage:string|undefined;
}

export default function ErrorInputMessage({errorMessage}:ErrorInputMessageProps){
    return(
        <p className=" text-base text-red-700 text-left w-full" >{errorMessage}</p>
    )
}