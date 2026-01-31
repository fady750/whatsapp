export default function ChatHeaderUserName({name}:{name:string|undefined}){
    return(
        <div className=" cursor-pointer text-start font-semibold text-primary-250" >
            {name}
        </div>
    )
}