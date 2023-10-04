import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        phone: { label: "Phone", type: "text" },
        code: { label: "Password", type: "password" },
        isPhone: { label: "isPhone", type: "text" },
      },
      authorize: async (credentials: any) => {
        var payload = {};
        if (credentials.isPhone === "true") {
          payload = {
            phone: credentials.phone,
            code: credentials.code,
          };
        } else {
          payload = {
            email: credentials.email,
            code: credentials.code,
          };
        }

        const url = `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/verify-otp`;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: myHeaders,
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  theme: {
    colorScheme: "dark",
  },

  callbacks: {
    async jwt({
      user,
      token,
      trigger,
      session,
    }: {
      user: any;
      token: any;
      trigger?: "update" | "signIn" | "signUp" | undefined;
      session?: Session;
    }) {
      // token.userRole = "regusr"
      // token = user
      if (trigger === "update") {
        token.token = token.token;
        token.selected_address = session?.selected_address;
      }
      if (user) {
        token = user.data.user;
        token.token = user.data.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      // session.token = {}
      return session;
    },
  },
};
