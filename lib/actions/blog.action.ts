"use server";

import { getServerSession } from "next-auth";
import { connectToDatabase } from "../mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BlogParams } from "./shared.types";
import Blog from "@/database/blog,model";
import User from "@/database/user.model";

export async function createBlog(params: BlogParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Not authenticated");
    }

    connectToDatabase();

    const { title, description, banner, content, tags, draft } = params;

    const newTags = tags.map((tag) => tag.toLowerCase());
    const slug = title
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .toLowerCase()
      .trim()
      .split(" ")
      .join("-");

    const blog = await Blog.create({
      slug,
      title,
      description,
      banner,
      content,
      tags: newTags,
      draft,
      author: session.user.id,
    });

    if (blog) {
      const incrementBlog = draft ? 0 : 1;

      await User.findOneAndUpdate(
        { _id: session.user.id },
        {
          $inc: {
            "account_info.total_posts": incrementBlog,
          },
          $push: {
            blogs: blog._id,
          },
        },
      );
    }

    return blog.slug;
  } catch (error: any) {
    throw error;
  }
}
