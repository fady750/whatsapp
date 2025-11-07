export type Message = {
    id: string;
    chatId: string;                // reference to conversation
    senderId: string;
    senderName?: string;           // optional, useful for group chats
    content: string;               // text message content
    type: 'text' | 'image' | 'video' | 'audio' | 'file';
    status: 'sent' | 'delivered' | 'read';
    date:string;
};