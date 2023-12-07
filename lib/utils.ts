import User from "@/database/user.model";
import { nanoid } from "nanoid";
import { connectToDatabase } from "./mongoose";

export async function generateUsername(email: string) {
  let username = email.split("@")[0];

  try {
    connectToDatabase();
    const isUsernameExist = await User.findOne({
      "personal_info.username": username,
    });

    if (isUsernameExist) {
      username = `${username}${nanoid(4)}`;
    }

    return username;
  } catch (error) {
    throw error;
  }
}
