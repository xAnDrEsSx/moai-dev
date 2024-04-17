// NextJS
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

interface SessionUser {
    access_token: string;
    user: IUser;
}

declare module "next-auth" {
    interface Session {
        data: SessionUser;
        expires: Date;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        user: IUser;
    }
}
