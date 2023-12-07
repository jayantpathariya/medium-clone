import { Schema, models, model, Document } from "mongoose";

const seed = [
  "Oliver",
  "Boo",
  "Samantha",
  "Lucky",
  "George",
  "Pumpkin",
  "Dusty",
  "Jasper",
  "Scooter",
  "Misty",
  "Daisy",
  "Casper",
  "Princess",
  "Sadie",
  "Leo",
  "Tiger",
  "Zoey",
  "Nala",
  "Smokey",
];

export interface IUser extends Document {
  personal_info: {
    fullname: string;
    email: string;
    password?: string;
    username: string;
    bio?: string;
    profile_img: string;
  };
  social_links: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
    website?: string;
  };
  account_info: {
    total_posts: number;
    total_reads: number;
  };
  google_auth: boolean;
  blogs: Schema.Types.ObjectId[];
  published_at: Date;
}

const UserSchema = new Schema<IUser>({
  personal_info: {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [3, "Fullname must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: String,
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    bio: {
      type: String,
      default: "",
      maxlength: [160, "Bio cannot be more than 100 characters long"],
    },
    profile_img: {
      type: String,
      default: () => {
        return `https://api.dicebear.com/7.x/micah/svg?${
          seed[Math.floor(Math.random() * seed.length)]
        }`;
      },
    },
  },
  social_links: {
    youtube: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
  },
  account_info: {
    total_posts: {
      type: Number,
      default: 0,
    },
    total_reads: {
      type: Number,
      default: 0,
    },
  },
  google_auth: {
    type: Boolean,
    default: false,
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  published_at: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
