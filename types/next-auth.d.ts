import NextAuth from "next-auth/next";


declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        expires: ISODateString,
        token:JWT
        selected_address:any
    }
}


// export interface DefaultSession {
//     user?: {
//         name?: string | null;
//         email?: string | null;
//         image?: string | null;
//     };
//     expires: ISODateString,

// }