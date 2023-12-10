"use server";

import { getServerSession } from "next-auth";
import { connectToDatabase } from "../mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BlogParams, GetBlogsParams } from "./shared.types";
import { BlogType } from "../types";
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

export async function getBlogs(params: GetBlogsParams) {
  try {
    connectToDatabase();
    const { page = 1, limit = 5, tag } = params;

    const query = tag ? { tags: tag } : {};

    const blogs = await Blog.find({ draft: false, ...query })
      .populate(
        "author",
        "personal_info.name personal_info.profile_img personal_info.fullname personal_info.username -_id",
      )
      .sort({ published_at: -1 })
      .select("slug title description banner tags activity published_at -_id")
      .limit(limit)
      .skip((page - 1) * limit);

    return blogs as BlogType[];
  } catch (error) {
    throw error;
  }
}

export async function getTrendingBlogs() {
  try {
    connectToDatabase();

    const blogs = await Blog.find({ draft: false })
      .populate(
        "author",
        "personal_info.name personal_info.profile_img personal_info.fullname personal_info.username -_id",
      )
      .sort({
        "activity.total_read": -1,
        "activity.total_likes": -1,
        published_at: -1,
      })
      .select("slug title description banner tags activity published_at -_id")
      .limit(5);

    return blogs as BlogType[];
  } catch (error) {
    throw error;
  }
}
