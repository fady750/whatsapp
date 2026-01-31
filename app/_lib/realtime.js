import { supabaseClient as supabase } from './supabaseClient';

export async function startRealTime(conversationId){
  const channel = supabase
  .channel(`conversation:${conversationId}`)
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'messages',
      filter: `conversation_id=eq.${conversationId}`,
    },
    (payload) => {
      console.log("Realtime Payload:", payload);

      if (payload.eventType === 'INSERT') {
        addMessageToUI(payload.new);
      }

      if (payload.eventType === 'UPDATE') {
        updateMessageInUI(payload.new);
      }
    }
  )
  .subscribe();
}

export async function sendingMessage(messageObj){
  await supabase.from('messages').insert([messageObj]);
}

export async function MarksMessagesDelivered(){
    await supabase
    .from('messages')
    .update({ status: 'delivered' })
    .eq('id', message.id);
}

export async function MarksMessagesRead(){
    await supabase
    .from('messages')
    .update({ status: 'read' })
    .eq('conversation_id', conversationId)
    .neq('sender_id', user.id); 
}
