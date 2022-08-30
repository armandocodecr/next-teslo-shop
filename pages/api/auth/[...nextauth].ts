import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

import { dbUsers } from '../../../database';


export default NextAuth({
  providers: [

    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'Ingresa tu correo' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Ingresa tu contraseña' },
      },
      async authorize(credentials) {

        console.log({credentials})

        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );

      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

  ],

  //Custom pages

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  //Callbacks

  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },

  session: {
    maxAge: 2592000, //30d durará la session
    strategy: 'jwt',
    updateAge: 86400, //cada dia se va a actualizar
  },


  callbacks: {
    
    async jwt({ token, account, user }) {
      
      if( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '' );
          break;

          case 'credentials':
            token.user = user;
            
          break;

        }
      }

      return token;
    },

    //Primero se genera el jwt y luego este es pasado a la session

    async session({ session, token, user }){

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    }

  }

});