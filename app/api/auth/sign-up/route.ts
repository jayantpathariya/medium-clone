import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import { generateUsername } from "@/lib/utils";
import { SignUpSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const { fullname, email, password } = await req.json();

    await SignUpSchema.parseAsync(req.body);

    const userExists = await User.findOne({
      "personal_info.email": email,
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 12);
    const username = await generateUsername(email);

    connectToDatabase();

    await User.create({
      personal_info: {
        fullname,
        email,
        password: hashedPassword,
        username: username,
      },
    });

    return NextResponse.json(
      {
        message: "Sign up successful",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        { message: "Validation error", validationErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
