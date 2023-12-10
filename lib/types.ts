import { Session } from "next-auth";

export type UserSession =
  | (Session & {
      fullname: string;
      username: string;
      profile_img: string;
    })
  | null;

export type BlogType = {
  title: string;
  description: string;
  slug: string;
  banner: string;
  tags: string[];
  published_at: Date;
  author: {
    personal_info: {
      fullname: string;
      profile_img: string;
      username: string;
    };
  };
  activity: {
    total_likes: number;
  };
};
