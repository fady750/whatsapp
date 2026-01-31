import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface User {
    profileID?: string;
    username?: string;
    avatar_url?: string;
    info?: string;
  }

  interface Session {
    user: {
      profileID?: string;
      username?: string;
      avatar_url?: string;
      info?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profileID?: string;
    username?: string;
    avatar_url?: string;
    info?: string;
    email?: string;
  }
}



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

export type RightPanelState = {
    mode : "settings"  | "profile" | "chats" | "init" | "contactInfo";
}

export type contact = {
    id : string;
    custom_name : string;
    avatar_url : null | string;
    email: string;
    info: string;
}

export type activeConversation = {
    id:string,
    user1_id:string;
    user2_id:string;
    updated_at:string;
    custom_name:string;
    info:string;
    email:string;
    avatar_url:string;
}

export type Conversation = {
    avatar_url:string;
    contact_id:string;
    conversation_id:string;
    custom_name:string;
    updated_at:string;

    lastMessage:string,
    lastMessageState:'sent' | 'delivered' | 'read',
    sender_id:"string";
}

