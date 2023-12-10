"use client";

import { generateUrlQuery, removeKeysFromUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "programming",
  "hollywood",
  "film making",
  "social media",
  "cooking",
  "tech",
  "finance",
];

export const TagFilter = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const router = useRouter();

  const handleCategory = (category: string) => {
    let newUrl;
    const parsedCategory = category.replace(" ", "-").toLowerCase();
    console.log({ parsedCategory, tag });
    if (parsedCategory === tag) {
      newUrl = removeKeysFromUrl({
        params: searchParams.toString(),
        keysToRemove: ["tag"],
      });

      router.push(newUrl, { scroll: false });

      return;
    } else {
      newUrl = generateUrlQuery({
        params: searchParams.toString(),
        key: "tag",
        value: parsedCategory,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category, index) => (
        <button
          onClick={() => handleCategory(category)}
          className={`tag  ${
            category.replace(" ", "-") === tag ? "bg-black text-white" : ""
          }`}
          key={index}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
