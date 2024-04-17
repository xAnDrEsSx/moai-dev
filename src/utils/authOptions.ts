// NextJS
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configs
import { NEXT_URL_API } from "@configs/env";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userEmail: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.userEmail || !credentials?.password) return;

                const { userEmail, password } = credentials;

                const res = await fetch(`${NEXT_URL_API}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userEmail, password }),
                });

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.data = token as any;
            return session;
        },
    },
    pages: {
        signIn: "/es/login",
    },
};
