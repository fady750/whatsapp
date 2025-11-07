import { ReadMessage, ReceivedMessage, SendMessage } from "./Icons";
type MessageStatusProps = {
    MessageStatus: "sent" | 'delivered' | "read"
}

export default function MessageStatus({MessageStatus}:MessageStatusProps){
    switch (MessageStatus) {
        case "sent":
        return <SendMessage />;
        case 'delivered':
        return <ReceivedMessage />;
        case "read":
        return <ReadMessage />;
    }

}