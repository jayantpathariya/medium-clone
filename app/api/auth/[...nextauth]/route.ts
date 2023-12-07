import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { SignInSchema } from "@/lib/validation";
import { ZodError } from "zod";

async function signIn(credentials: any) {
  try {
    const { email, password } = credentials;

    const validatedCredentials = await SignInSchema.parseAsync(credentials);

    connectToDatabase();

    const user = await User.findOne({
      "personal_info.email": email,
    });

    if (!user) {
      throw new Error("No user found");
    }

    const isPasswordValid = await compare(
      password,
      user.personal_info.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      // Extract and return validation errors
      const validationErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      console.log(validationErrors);
      return { validationErrors };
    }

    throw error;
  }
}

export const authOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const user = await signIn(credentials);

          if (user && user.validationErrors) {
            return Promise.resolve(null);
          }

          return user;
        } catch (error) {
          console.log(error);
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.username = user.personal_info.username;
        token.fullname = user.personal_info.fullname;
        token.profile_img = user.personal_info.profile_img;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.username = token.username;
        session.user.fullname = token.fullname;
        session.user.profile_img = token.profile_img;
      }

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
