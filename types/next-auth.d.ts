import NextAuth, {CredentialsOptions} from "next-auth";
import { JWT } from "next-auth/jwt";
import { IUser } from "../interfaces";
import Credentials from 'next-auth/providers/credentials';
 
import { JWTResponse } from "./jwt";
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string | undefined;
    user: IUser | undefined;
  }
}
 
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
 
    createdAt?: string;
    updatedAt?: string;
  }
  interface Session {
    user: IUser;
    accessToken: string | undefined;
  }

}

declare module "next-auth/providers/credentials" {

  interface CredentialsConfig<IUser> {
    type: "credentials";
    credentials: C | undefined;
    authorize: IUser;
  }
}