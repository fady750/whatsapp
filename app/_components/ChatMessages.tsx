import { updateMessagesStateAction } from "@/app/_lib/action";
import { supabaseClient as supabase } from '@/app/_lib/supabaseClient';
import { Message } from "@/app/_types/Message";
import MessageItem from "@/features/messages/MessageItem";
import { useEffect, useRef, useCallback } from "react";
import ChatMessagesInput from "./ChatMessagesInput";
import { useSession } from "next-auth/react";
import { useChatContext } from "../_providers/ChatProvider";

type ChatMessagesProps = {
  messages:Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
}

export default function ChatMessages({messages,setMessages }:ChatMessagesProps){
    const { activeConversation} = useChatContext();
    const {data} = useSession()
    const user = data?.user
    const profileID = user?.profileID;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousConversationIdRef = useRef<string | undefined>(undefined);
  const previousMessagesLengthRef = useRef<number>(0);

  const scrollToBottom = useCallback((smooth: boolean = false) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    
    if (smooth) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

    useEffect(() => {
      if (!activeConversation?.id) return;
      
      const isNewConversation = previousConversationIdRef.current !== activeConversation.id;
      const wasEmpty = previousMessagesLengthRef.current === 0;
      const nowHasMessages = messages.length > 0;
      
      if (isNewConversation) {
        previousConversationIdRef.current = activeConversation.id;
        previousMessagesLengthRef.current = 0;
      }
      
      const shouldScrollInstant = (isNewConversation && nowHasMessages) || (wasEmpty && nowHasMessages);
      
      if (shouldScrollInstant) {
        previousMessagesLengthRef.current = messages.length;
        // Multiple attempts to ensure scroll happens after DOM renders
        const scrollInstant = () => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
          }
        };
        // Use multiple timing strategies to catch DOM rendering
        scrollInstant(); // Immediate
        requestAnimationFrame(() => {
          scrollInstant();
          setTimeout(scrollInstant, 0);
          setTimeout(scrollInstant, 500);
          setTimeout(scrollInstant, 700);
          setTimeout(scrollInstant, 800);
        });
        return;
      }
      
      if (messages.length > previousMessagesLengthRef.current) {
        previousMessagesLengthRef.current = messages.length;
        setTimeout(() => scrollToBottom(true), 0);
      }
    }, [messages, activeConversation?.id, scrollToBottom]);

    useEffect(() => {
      const channel = supabase
        .channel(`conversation:${activeConversation?.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${activeConversation?.id}`,
          },
          async (payload)=>{
            if(payload.eventType === "INSERT"){
              const newMessages = payload.new as Message;
              setMessages((previousMessages) => [...previousMessages, newMessages]);
              if(activeConversation?.id === undefined) return;
              if(profileID !== newMessages.sender_id){
                const user2_id = activeConversation?.user1_id === profileID ? activeConversation?.user2_id : activeConversation?.user1_id;
                if(activeConversation?.id === undefined || user2_id === undefined) return null;
                await updateMessagesStateAction({conversation_id:activeConversation?.id,sender_id:user2_id});
              }
            }
            if(payload.eventType === "UPDATE"){
              const newMessage = payload.new as Message;
              setMessages(prev =>
                prev.map(msg => msg.id === newMessage.id ? newMessage : msg)
              );
            }
          }
        )
        .subscribe();
        return () => { supabase.removeChannel(channel);};
      }, 
    [activeConversation?.id, activeConversation?.user1_id, activeConversation?.user2_id, profileID, setMessages]);

    if(activeConversation === undefined) return;

    return(
        <div className=" relative w-full bg-[url(/background.png)]  bg-cover bg-center  h-full  ">
          <div className="absolute inset-0 bg-black/80 " />

          <div className="z-100 h-full w-full relative" >
            <div className=" h-[calc(100%-69px)] pb-3.5 overflow-y-hidden w-full">
              <div 
                ref={scrollContainerRef}
                className=" h-[calc(100%-64px)] relative min-h-0 pt-2 overflow-x-hidden overflow-y-scroll scroll-smooth flex flex-col gap-1.5" 
              >
                  {messages.map((message, idx)=> <MessageItem key={idx} message={message} /> )}
                  <div ref={messagesEndRef} className="h-0! bottom-0" />
              </div>
            </div>
            <ChatMessagesInput/>
          </div>
        </div>
    )
}