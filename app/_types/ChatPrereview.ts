export type Message = {
    id: number;
    senderId: number;
    receiverId: number;
    lastMessage: string;
    imgURL:string;
    date: string;
    conversationTitle:string;
    MessageStatus: "sent" | 'delivered' | "read" ;
};

/**
 * 
 */