import { supabase } from './supabase';

// GET
export async function getProfiles(email) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

    // No error here! We handle the possibility of no guest in the sign in callback
    return data;
}

export async function getProfile(email){
    const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single();
    if(error){
      return {state:"error", message:error.message, user:{}};
    }
    return {state:"success", message:"user founded", user:data};
}

export async function getAllUserContact(userid){
  // first get all user contacts 
  const {data, error:allUserContactError} = await supabase
  .from('contacts')
  .select("contact_id, custom_name")
  .eq('owner_id', userid)
  if(allUserContactError){
    throw new Error(allUserContactError.message);
  }
  const ids = data.map(item => item.contact_id);
  const {data:contactsData, contactsDataError} = await supabase
  .from("profiles")
  .select('id, avatar_url, email, info')
  .in("id",ids)
  if(contactsDataError){
    throw new Error(contactsDataError.message)
  }

  const enrichedContacts = contactsData.map(contact => {
    // Find the corresponding custom_name from contacts
    const matchingContact = data.find(item => item.contact_id === contact.id);
    
    // Create a new object combining contact data and custom_name
    return {
      ...contact,
      custom_name: matchingContact ? matchingContact.custom_name : null, // Set null if no match found
    };
  });


  return enrichedContacts
}

export async function getContact(contact_id){
  const {data:contact, error:contactError} = await supabase.
  from("contacts")
  .select("custom_name")
  .eq("contact_id", contact_id)
  .single();
  if( contactError && contactError.code !== 'PGRST116'){
    throw new Error(contactError.message);
  }
  console.log(contactError);
  console.log(contact);
  const {data:profile, error} = await supabase
  .from("profiles")
  .select("info, email, avatar_url ")
  .eq("id", contact_id)
  .single();
  if(error){
    throw new Error(error.message);
  }
  let object ;
  if( contactError &&  contactError.code === 'PGRST116'){
    object = {
      custom_name:profile.email,
      ...profile
    }
    return object
  }
  object = {
    ...contact,
    ...profile
  }
  console.log(object);
  return object;
}

export async function getConversation({currentUserId,contactId }){
  const { data: existing, error: findError } = await supabase
  .from("conversations") 
  .select("*")
  .or(
    `and(user1_id.eq.${currentUserId},user2_id.eq.${contactId}),and(user1_id.eq.${contactId},user2_id.eq.${currentUserId})`
  )
  .limit(1)
  .single();
  if(findError && findError.code !== "PGRST116"){
    throw new Error(findError.message);
  }
  if(existing){
    return existing;
  }
  const newConversation = await CreateConversation({currentUserId, contactId});
  return newConversation;
}

export async function getUpdatedConversation({currentUserId,contactId, conversationId }){
  const arr = [{currentUserId,contactId }]

  const enriched = await Promise.all(arr.map(async (conv)=>{
      const { data: contactData } = await supabase
      .from('contacts')
      .select('custom_name')
      .eq('contact_id', contactId)
      .single();

      const { data: profileData } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', contactId)
      .single();

      const {data:lastMessage} = await supabase
      .from("messages")
      .select("content, status, sender_id")
      .eq("conversation_id",conversationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

      return{
        conversation_id: conversationId,
        contact_id: contactId, 
        custom_name: contactData?.custom_name || null,
        avatar_url: profileData?.avatar_url || null,
        lastMessage:lastMessage?.content,
        lastMessageState:lastMessage?.status,
        sender_id:lastMessage.sender_id,
      };
  }))
  return enriched;

}

// export async function getAllConversations

export async function getAllConversations(currentUserId){
  const { data: conversations, error: findError } = await supabase
    .from("conversations")
    .select("*")
    .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
    .order("updated_at", { ascending: false });
  if (findError && findError.code !== "PGRST116") {
    throw new Error(findError.message);
  }
  if(! conversations) return[];
  const enriched = await Promise.all(
    conversations.map(async (conv) => {
      const userID = conv.user1_id === currentUserId ? conv.user2_id : conv.user1_id;
      
      let { data: contactData } = await supabase
      .from('contacts')
      .select('custom_name')
      .eq('contact_id', userID)
      .single();
      if( contactData === null || contactData.custom_name === null){
        const { data: profileData } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userID)
        .single();
        contactData = {
          custom_name:profileData.email
        }
      }
      
      const { data: profileData } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userID)
      .single();
      
      const {data:lastMessage} = await supabase
      .from("messages")
      .select("content, status, sender_id")
      .eq("conversation_id",conv.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();


      return {
        conversation_id: conv.id,
        contact_id: userID,
        custom_name: contactData?.custom_name || null,
        avatar_url: profileData?.avatar_url || null,
        updated_at: conv.updated_at,
        lastMessage:lastMessage?.content,
        lastMessageState:lastMessage?.status,
        sender_id:lastMessage?.sender_id,
      };
    })
  );
  return enriched;

}

export async function getAllMessagesConversation(conversationId){
  const {data:messages, error} = await supabase
  .from("messages")
  .select("*")
  .eq("conversation_id", conversationId)
  .order("created_at", { ascending: true });
  if(error){
    throw new Error(error.message);
  }
  return messages
}

export async function getUpdatedLastMessage(MessageID){
  const {data, error} = await supabase
  .from( "messages" )
  .select("content, status")
  .eq("id", MessageID)
  .single();

  if(error){
    throw new Error(error.message);
  }
  const lastMessage = {
    lastMessage:data.content,
    lastMessageState:data.status,
  }
  return lastMessage;
}



// CREATE

export async function createContact(contact){
  const { data, error } = await supabase
  .from('contacts')
  .insert([contact])
  .select()

  if(error){
    throw new Error (error.message);
  }

}

export async function createProfile(newProfile) {
  const { data, error } = await supabase.from('profiles').insert([newProfile]);

  if (error) {
    console.error(error);
    throw new Error('profile could not be created');
  }

  return data;
}

export async function CreateConversation({currentUserId,contactId }){
  const newConversation = {
    user1_id:currentUserId,
    user2_id:contactId,
  }

  const { data, error } = await supabase
  .from('conversations')
  .insert([newConversation])
  .select()
  .single();
  if(error){
    throw new Error(error.message);
  }
  return data;
}

// UPDATE

export async function updateConversation(conversationId){
    const timestamp = new Date();
    const obj = {"updated_at":timestamp,}
    const {error:updateConversationError} = await supabase
    .from("conversations")
    .update(obj)
    .eq("id", conversationId);
    if(updateConversationError){
      throw new Error(updateConversationError.message)
    }
}

export async function updateMessagesState({conversation_id, sender_id}){
  const {error} = await supabase
  .from('messages')
  .update({status:'read'})
  .eq('conversation_id', conversation_id)
  .eq('sender_id',sender_id)
  .neq('status', 'read');

  if(error){
    throw new Error(error.message);
  }
  console.log('updateMessagesState');
}

export async function updateProfileName({name, userID}){
  const {data,error} = await supabase
  .from("profiles")
  .update({'username':name })
  .eq("id", userID)
  .select()
  .single();
  if(error){
    throw new Error(error.message);
  }
  return data;
}

export async function updateProfileInfo({info, userID}){
  const {data,error} = await supabase
  .from("profiles")
  .update({'info':info })
  .eq("id", userID)
  .select()
  .single();
  if(error){
    throw new Error(error.message);
  }
  return data;
}

export async function updateProfileImage({file, userId}){
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

  const { error} = await supabase.storage.from("avatars").upload(filePath, file, {
    cacheControl: '3600',
    upsert: true, // overwrite existing avatar
    contentType: file.type,
  });
  if(error){
    throw new Error(error.message);
  }

  const { data  } = await supabase.storage
  .from('avatars')
  .getPublicUrl(filePath)

  const { data:updateDataProfile ,error:updatingProfileImageError} = await supabase.
  from("profiles")
  .update({avatar_url:data.publicUrl})
  .eq("id", userId);
  if(updatingProfileImageError){
    throw new Error(updatingProfileImageError.message);
  }
  return data.publicUrl;
}


// DELETE

export async function removeProfileImage(userID){
  const ImageURL = 'https://ttmpzzipvugloozyzqic.supabase.co/storage/v1/object/public/avatars/Blank%20Pfp.jpeg';
  const {error} = await supabase
  .from("profiles")
  .update({avatar_url:ImageURL})
  .eq("id", userID);
  if(error){
    throw new Error(error.message);
  }
  return ImageURL;
}


// messages 

export async function sendingMessage({conversationId,senderId,content}){
  const { data, error } = await supabase
  .from('messages')
  .insert([
    {
      conversation_id: conversationId,
      sender_id: senderId,
      content,
      status: 'sent', // initial status
    }
  ])
  .select()
  .single(); // returns the inserted row
  if (error) {
    throw new Error(error.message);
  };
}
