export type Message = {
    content:string;
    conversation_id:string;
    created_at:string; 
    id:string; 
    sender_id:string; 
    status:"sent" | "delivered" | "read";
};