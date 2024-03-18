import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        if (!email || !password) {
          throw new Error("Missing username or password");
        }

        // Fetch user data from API
        const res = await fetch("http://10.1.177.121:8881/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: email, password }),
        });

        // Check for successful login
        if (!res.ok) throw new Error("Invalid credentials");

        // Parse user data from response
        const userData = await res.json();
        const { access_token } = userData;
        const decodedData = jwt.decode(access_token) as JwtPayload;

        if (!decodedData) {
          return null;
        }

        return {
          id: "1",
          email: decodedData.sub,
          role: decodedData.role[0],
          token: access_token,
          exp: decodedData.exp,
          iat: decodedData.iat,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          role: u.role,
        };
      }
      return token;
    },
  },
};
