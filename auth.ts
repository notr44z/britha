import NextAuth, { type NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString() ?? "";
        const password = credentials?.password?.toString() ?? "";

        if (email === "admin@britha.local" && password === "britha") {
          return {
            id: "admin",
            name: "Britha",
            email,
            role: "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);

export const { handlers, auth, signIn, signOut } = handler;

export async function getAuthSession() {
  return getServerSession(authOptions);
}
