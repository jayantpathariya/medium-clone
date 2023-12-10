import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { SignInSchema } from "@/lib/validation";
import { ZodError } from "zod";
import { generateUsername } from "@/lib/helper";

async function signIn(credentials: any) {
  try {
    const { email, password } = credentials;

    await SignInSchema.parseAsync(credentials);

    connectToDatabase();

    const user = await User.findOne({
      "personal_info.email": email,
    });

    if (!user) {
      throw new Error("No user found");
    }

    if (user.google_auth) {
      throw new Error(
        "Account already exists. Please sign in with your Google account",
      );
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

async function signUpFromGoogle(user: any) {
  try {
    if (!user) {
      throw new Error("Something went wrong");
    }
    const { name, email } = user;

    connectToDatabase();

    let newUser = await User.findOne({
      "personal_info.email": email,
    }).select(
      "personal_info.fullname personal_info.username personal_info.profile_img google_auth",
    );

    if (newUser) {
      if (!newUser.google_auth) {
        throw new Error(
          "Account already exists. Please sign in with your password",
        );
      }
    } else {
      const username = await generateUsername(email);

      newUser = await User.create({
        personal_info: {
          fullname: name,
          email,
          username,
        },
        google_auth: true,
      });
    }
    return newUser;
  } catch (error) {
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
        } catch (error: any) {
          console.log(error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      try {
        if (account?.provider === "google") {
          const dbUser = await signUpFromGoogle(profile);

          token.username = dbUser.personal_info.username;
          token.fullname = dbUser.personal_info.fullname;
          token.profile_img = dbUser.personal_info.profile_img;
          token.id = dbUser._id;
        } else {
          if (user) {
            token.username = user.personal_info.username;
            token.fullname = user.personal_info.fullname;
            token.profile_img = user.personal_info.profile_img;
            token.id = user._id;
          }
        }
        return token;
      } catch (error) {
        throw error;
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      try {
        if (token) {
          session.user.username = token.username;
          session.user.fullname = token.fullname;
          session.user.profile_img = token.profile_img;
          session.user.id = token.id;
        }

        return session;
      } catch (error) {
        throw error;
      }
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
