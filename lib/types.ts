import { Session } from "next-auth";

export type UserSession =
  | (Session & {
      fullname: string;
      username: string;
      profile_img: string;
    })
  | null;
