// NextJS
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface SessionUser {
    access_token: string;
    user: User;
    iat: number;
    exp: number;
    jti: string;
}

interface User {
    userId: string;
    userEmail: string;
    name: string;
    lastName: string;
    documentType: string;
    document: string;
    nacionality: string;
    address: string;
    prefix: number;
    cel: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
}

declare module "next-auth" {
    interface Session {
        user: SessionUser;
        expires: Date;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: number;
            email: string;
            name: string;
        };

        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}
