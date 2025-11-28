export type LeftOrRightArrowButton = {
    size?:"large" | "medium" | "small",
    disabled? : boolean,
}

export type LeftPanelState ={
    mode : "chats" |
    "newContact" |
    "profile" |
    "settings" |
    "archived" |
    "starredMessages"|
    "contacts",
}