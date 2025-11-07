 import { FailedLoginResponse, SuccessLoginResponse } from "@/interfaces";
import { AuthOptions } from "next-auth";
 import CredentialsProvider from "next-auth/providers/credentials"
 

     export  const authOptions : AuthOptions={
    providers:[
        CredentialsProvider({
          name:'Hendy',
          credentials:{
            email:{},
            password:{}
          },
           authorize : async(credentials)=>{
            const response= await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
                method:"POST",
                body: JSON.stringify({
                    email:credentials?.email,
                    password:credentials?.password
                }),
                headers:{"Content-Type": "application/json"}
            });
            const payload :SuccessLoginResponse|FailedLoginResponse = await response.json();

          if ("token" in payload) {
        return {
                id:payload.user.email,
                user:payload.user,
                token:payload.token
              };

            } else {
              throw new Error(payload.message)
}
              
          },
        }),
    ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.user = user.user;
      token.accessToken = user.token; // <-- احفظ التوكن هنا
    }
    return token;
  },

  async session({ session, token }) {
    if (token) {
      session.user = token.user;
      session.accessToken = token.accessToken; // <-- ضيف التوكن في السيشن
    }
    return session;
  },
},

pages:{
    signIn:'/login',
  error:'/login',
},
secret:process.env.NEXTAUTH_SECRET
};






