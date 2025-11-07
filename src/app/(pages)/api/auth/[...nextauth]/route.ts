
import { authOptions } from "@/auth"
// import NextAuth from "next-auth"





// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
