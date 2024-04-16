// NextJS
import NextAuth from "next-auth/next";

// Utils
import { authOptions } from "@utils/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
