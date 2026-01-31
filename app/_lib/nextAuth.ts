import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createProfile, getProfiles } from "@/app/_lib/data-service";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

export const authOptions:NextAuthConfig = {
    providers:[
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
                credentials: {
                    email: { label: "Email", type: "text" },
                    password: { label: "Password", type: "password" },
                },
                name: "Credentials",
            
                async authorize(credentials) {
                    const { email, password } = credentials;
            
                    const user = await getProfiles(email);
                    if (!user) return null;
            
                    const valid = await bcrypt.compare(password as string, user.password);
                    if (!valid) return null;
            
                    return {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        name: user.username,
                        avatar_url: user.avatar_url,
                        info: user.info,
                    };
                },
        }),
    ],
    callbacks:{

        authorized({ auth }) {
                return !!auth?.user;
        },

        async signIn({ user }) {
            try {
                const existing = await getProfiles(user.email);
    
            if (!existing) {
                await createProfile({
                email: user.email,
                username: user.name,
            });
            }
                return true;
            } catch {
                return false;
            }
        },

        async jwt({token, trigger, session, user}){
            if (user) {
                const profile = await getProfiles(user.email);
                token.email = profile.email;
                token.username = profile.username;
                token.avatar_url = profile.avatar_url;
                token.info = profile.info;
                token.profileID = profile.id;
            }
            if (trigger === "update" && session?.user) {
                // Update token from session.user (passed from update() call)
                if (session.user.username !== undefined) token.username = session.user.username;
                if (session.user.avatar_url !== undefined) token.avatar_url = session.user.avatar_url;
                if (session.user.info !== undefined) token.info = session.user.info;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email as string;
                session.user.username = token.username;
                session.user.avatar_url = token.avatar_url;
                session.user.info = token.info;
                session.user.profileID = token.profileID ;
                return session;
            }
        },

    },
    pages:{
        signIn:"/login",
        newUser:"/signup",
    }

}

export const {auth, signIn, signOut} = NextAuth(authOptions);