"use client";

import Spinner from "@/app/_components/Spinner";
import { useChatContext } from "@/app/_providers/ChatProvider";
import ChatPreview from "@/features/chats/ChatPreview";
import { OverFlowList } from "@/shared/ui/OverFlowList";

export default function ChatsList() {
  const { conversationsState } = useChatContext();
  if(conversationsState === undefined) return(
    <OverFlowList styles=" w-full mb-[76px]!">
      <Spinner/>
    </OverFlowList>
  );

  return (
    <OverFlowList styles="mb-[76px]! gap-1!">
      {conversationsState.map((conversation) => (
        <ChatPreview chat={conversation} key={conversation.contact_id} />
      ))}
    </OverFlowList>
  );
}
