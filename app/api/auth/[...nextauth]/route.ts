import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { SignInSchema } from "@/lib/validation";
import { ZodError } from "zod";
import { generateUsername } from "@/lib/utils";

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

async function signUp(user: any) {
  try {
    if (!user) {
      throw new Error("Something went wrong");
    }
    const { name, email, picture } = user;

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
      const profile_image = picture.replace("s96-c", "s384-c");
      const username = await generateUsername(email);

      newUser = await User.create({
        personal_info: {
          fullname: name,
          email,
          profile_img: profile_image,
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
        } catch (error) {
          console.log(error);
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === "google") {
        const dbUser = await signUp(profile);

        token.username = dbUser.personal_info.username;
        token.fullname = dbUser.personal_info.fullname;
        token.profile_img = dbUser.personal_info.profile_img;
      } else {
        if (user) {
          token.username = user.personal_info.username;
          token.fullname = user.personal_info.fullname;
          token.profile_img = user.personal_info.profile_img;
        }
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
