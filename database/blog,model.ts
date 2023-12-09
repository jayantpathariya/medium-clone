import { Schema, models, model, Document } from "mongoose";

export interface IBlog extends Document {
  slug: string;
  title: string;
  banner: string;
  description: string;
  content: [];
  author: Schema.Types.ObjectId;
  tags: string[];
  activity: {
    total_likes: number;
    total_comments: number;
    total_reads: number;
  };
  total_parent_comments: number;
  comments: Schema.Types.ObjectId[];
  draft: boolean;
  published_at: Date;
}

const BlogSchema = new Schema<IBlog>({
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  banner: String,
  description: String,
  content: {
    type: [],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },
  tags: {
    type: [String],
    required: [true, "Tags is required"],
  },
  activity: {
    total_likes: {
      type: Number,
      default: 0,
    },
    total_comments: {
      type: Number,
      default: 0,
    },
    total_reads: {
      type: Number,
      default: 0,
    },
  },
  total_parent_comments: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },
  draft: {
    type: Boolean,
    default: false,
  },
  published_at: {
    type: Date,
    default: Date.now,
  },
});

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;
