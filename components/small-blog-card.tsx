import { BlogType } from "@/lib/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type SmallBlogCardProps = {
  blog: BlogType;
  index: number;
};

export const SmallBlogCard = ({ blog, index }: SmallBlogCardProps) => {
  const { title, slug, author, published_at } = blog;
  const { username, fullname, profile_img } = author.personal_info;

  return (
    <Link href={`/blog/${slug}`} className="mb-8 flex gap-5">
      <span className="blog-index">
        {index < 10 ? `0${index + 1}` : index + 1}
      </span>

      <div>
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
      </div>
    </Link>
  );
};
