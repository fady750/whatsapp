import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

import {getProfiles, createProfile} from "@/app/_lib/data-service"

const authConfig = {
    providers:[
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            name: 'Credentials',
            async authorize(credentials) {
                const {email,password } = credentials;
                const  user  = await getProfiles(email)
                if (!user) return null;
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    callbacks:{
        authorized({auth, request}){
            return !!auth?.user;
        },
        async signIn({user, account, profile}){
            try{
                const existingGuest = await getProfiles(user.email);
                if(!existingGuest){
                    await createProfile({email:user.email,username:user.name});
                }
                return true;
            }
            catch{
                return false;
            }
        },
        async session({session, user}){
            const profile = await getProfiles(session.user.email);
            session.user.profileID = profile.id;
            return session;
        }
    },
    
    pages:{
        signIn:"/login",
    }
    
}


export const {auth, signIn, signOut ,handlers:{GET, POST}} = NextAuth(authConfig);


