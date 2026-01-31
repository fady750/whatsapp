import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { createProfile, getProfiles } from "@/app/_lib/data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    Credentials({
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",

      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await getProfiles(email);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.password);
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

  callbacks: {
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

    /**
     * JWT callback — stores all user fields to survive page refreshes
     */
    async jwt({ token, user, trigger, session }) {
      // On login OR after update()
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.name = user.name;
        token.avatar_url = user.avatar_url;
        token.info = user.info;
        token.profileID = user.profileID;
      }

      // If the user calls update(), NextAuth passes session.user here
      if (trigger === "update" && session?.user) {
        token.username = session.user.username;
        token.name = session.user.name;
        token.avatar_url = session.user.avatar_url;
        token.info = session.user.info;
        token.profileID = session.user.profileID;
      }

      return token;
    },

    /**
     * Session callback — fetches FRESH data from DB every time
     */
    async session({ session, token }) {
      // Always read fresh row
      const profile = await getProfiles(token.email);

      session.user.id = profile.id;
      session.user.email = profile.email;
      session.user.username = profile.username;
      session.user.name = profile.username;
      session.user.avatar_url = profile.avatar_url;
      session.user.info = profile.info;
      session.user.profileID = profile.id;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  update,
  handlers: { GET, POST },
} = NextAuth(authConfig);