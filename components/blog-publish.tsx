"use client";

import { X } from "lucide-react";
import AnimationWrapper from "./shared/animation-wrapper";
import { useEditor } from "@/context/editor-provider";
import Image from "next/image";
import { Tag } from "./tag";
import toast from "react-hot-toast";
import { useState } from "react";
import { createBlog } from "@/lib/actions/blog.action";
import { useRouter } from "next/navigation";

const MAX_DESCRIPTION_LENGTH = 200;
const MAX_TAGS = 5;

const BlogPublish = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { blog, setBlog, setEditorState } = useEditor();

  const router = useRouter();

  const handleClose = () => {
    setEditorState("editor");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setBlog((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleDescriptionKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    const { key } = e;

    if (key === "Enter") {
      e.preventDefault();
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setBlog((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === "Enter" || key === ",") {
      e.preventDefault();

      const value = e.currentTarget.value.trim();

      if (!value) return;

      if (blog.tags.length < MAX_TAGS) {
        if (!blog.tags.includes(value)) {
          setBlog((prev) => ({
            ...prev,
            tags: [...prev.tags, value],
          }));

          e.currentTarget.value = "";
        }
      } else {
        toast.error(`You can only add ${MAX_TAGS} tags`);
      }
    }
  };

  const handlePublishBlog = async () => {
    if (!blog.title) {
      return toast.error("Please enter a title");
    }

    if (!blog.description) {
      return toast.error("Please enter a description");
    } else if (blog.description.length > MAX_DESCRIPTION_LENGTH) {
      return toast.error(
        `Description cannot be more than ${MAX_DESCRIPTION_LENGTH} characters`,
      );
    }

    if (blog.tags.length === 0) {
      return toast.error("Please add at least one tag to your blog");
    }

    const toastId = toast.loading("Publishing your blog");
    try {
      setIsLoading(true);

      const data = {
        title: blog.title,
        description: blog.description,
        banner: blog.banner,
        content: blog.content,
        tags: blog.tags,
        draft: false,
      };

      await createBlog(data);

      toast.success("Blog published successfully", {
        id: toastId,
      });

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimationWrapper>
      <section className="grid min-h-screen w-screen items-center py-16 lg:grid-cols-2 lg:gap-4">
        <button
          onClick={handleClose}
          className="absolute right-[5vw] top-[5%] z-10 h-12 w-12 lg:top-[10%] "
        >
          <X />
        </button>

        <div className="center max-w-[550px]">
          <p className="mb-1 text-dark-grey">Preview</p>

          <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg bg-grey">
            <Image
              src={blog.banner}
              width={1920}
              height={1080}
              alt={`${blog.title} banner`}
            />
          </div>

          <h1 className="mt-2 line-clamp-2 text-4xl font-medium leading-tight">
            {blog.title}
          </h1>

          <p className="mt-4 line-clamp-2 font-gelasio text-xl leading-7">
            {blog.description}
          </p>
        </div>

        <div className="lg:border-1 border-grey lg:pl-8">
          <p className="mb-2 mt-9 text-dark-grey">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={blog.title}
            className="input-box pl-4"
            onChange={handleTitleChange}
          />

          <p className="mb-2 mt-9 text-dark-grey">
            Short description about your blog
          </p>
          <textarea
            maxLength={MAX_DESCRIPTION_LENGTH}
            defaultValue={blog.description}
            className="input-box h-40 resize-none pl-4 leading-7"
            onChange={handleDescriptionChange}
            onKeyDown={handleDescriptionKeyDown}
          />

          <p className="mt-1 text-right text-sm text-dark-grey">
            {MAX_DESCRIPTION_LENGTH - blog.description.length} characters left
          </p>

          <p className="mb-2 mt-9 text-dark-grey">
            Tags - ( Helps readers to find and rank your blog )
          </p>

          <div className="input-box relative py-2 pb-4 pl-2">
            <input
              type="text"
              placeholder="Tags"
              className="input-box sticky left-0 top-0 mb-3 bg-white pl-4 focus:bg-white"
              onKeyDown={handleTagKeyDown}
            />
            {blog.tags.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>
          <p className="mb-4 mt-1 text-right text-dark-grey">
            {MAX_TAGS - blog.tags.length} tags left
          </p>

          <button
            disabled={isLoading}
            onClick={handlePublishBlog}
            className="btn-dark px-8"
          >
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default BlogPublish;
