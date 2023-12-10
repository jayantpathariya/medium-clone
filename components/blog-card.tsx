import Image from "next/image";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import Link from "next/link";
import { BlogType } from "@/lib/types";

export const BlogCard = ({ blog }: { blog: BlogType }) => {
  const {
    title,
    description,
    banner,
    tags,
    slug,
    activity,
    author,
    published_at,
  } = blog;
  const { fullname, profile_img, username } = author.personal_info;

  return (
    <Link
      href={`/blog/${slug}`}
      className="mb-4 flex items-center gap-8 border-b border-grey pb-5"
    >
      <div className="w-full">
        <div className="mb-7 flex items-center gap-2">
          <Image
            src={profile_img}
            width={24}
            height={24}
            alt={`${fullname} profile image`}
            className="h-6 w-6 rounded-full"
          />
          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{format(published_at, "d MMM")}</p>
        </div>
        <h1 className="blog-title">{title}</h1>

        <p className="my-3 line-clamp-2 font-gelasio text-xl leading-7 max-sm:hidden md:max-[1100px]:hidden">
          {description}
        </p>

        <div className="mt-7 flex gap-4">
          <span className="btn-light px-4 py-1">{tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <Heart size={16} /> {activity.total_likes}
          </span>
        </div>
      </div>

      <div className="aspect-square h-28 bg-grey">
        <Image
          src={banner}
          width={200}
          height={200}
          alt={title}
          className="aspect-square h-full w-full object-cover"
        />
      </div>
    </Link>
  );
};
