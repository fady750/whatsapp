const FiltersOptions:[string, string, string, string] = [
    "All",
    "Unread",
    "Favorites",
    "Groups",
]

export default function ChatsFilterBar(){
    return(
        <div className="flex items-center justify-start flex-wrap pl-5 pt-0.5 pr-2.5 pb-[7px] gap-2 min-w-0 min-h-0 shrink-0" >
            {FiltersOptions.map((ele, idx)=>{
                return(
                    <div key={idx} className={`px-3 cursor-pointer hover:bg-primary-150 border rounded-border-radius-fully h-8 w-fit border-primary-50  flex items-center justify-center ${idx === 0 && "bg-filter-50" }`} >
                        <p className="text-primary-100" >{ele}</p>
                    </div>
                )
            })}
        </div>
    )
}