import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Session ve JWT için tip genişletmeleri
interface ExtendedSession extends Session {
  accessToken?: string;
  idToken?: string;
}

interface ExtendedToken extends JWT {
  accessToken?: string;
  idToken?: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token as ExtendedToken;
    },
    async session({ session, token }) {
      const extendedSession = session as ExtendedSession;
      extendedSession.accessToken = (token as ExtendedToken).accessToken;
      extendedSession.idToken = (token as ExtendedToken).idToken;
      return extendedSession;
    }
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };