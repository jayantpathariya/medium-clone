import { useState } from "react";
import { useEditor } from "@/context/editor-provider";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { createBlog } from "@/lib/actions/blog.action";
import { useRouter } from "next/navigation";

export const EditorNavbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { blog, setBlog, setEditorState, textEditor } = useEditor();

  const router = useRouter();

  const handlePublish = async () => {
    if (!blog.banner) {
      return toast.error("Please upload a banner");
    }

    if (!blog.title) {
      return toast.error("Please enter a title");
    }

    try {
      const output = await textEditor?.save();
      if (output) {
        if (!output.blocks.length) {
          return toast.error("Please enter some content");
        } else {
          setBlog((prev) => ({
            ...prev,
            content: output.blocks,
          }));

          setEditorState("publish");
        }
      }
    } catch (error) {}
  };

  const handleDraft = async () => {
    if (!blog.title) {
      return toast.error("Please enter a title");
    }

    const toastId = toast.loading("Saving your blog");
    try {
      setIsLoading(true);

      const data = {
        title: blog.title,
        description: blog.description,
        banner: blog.banner,
        content: blog.content,
        tags: blog.tags,
        draft: true,
      };

      await createBlog(data);

      toast.success("Blog Saved successfully", {
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
    <header className="navbar">
      <Link href="/" className="w-10">
        <Image
          src="/images/logo.png"
          width={40}
          height={40}
          alt="logo"
          className="w-full"
        />
      </Link>

      <p className="line-clamp-1 w-full text-black max-md:hidden">
        {blog.title ? blog.title : "New Blog"}
      </p>

      <div className="ml-auto flex gap-4">
        <button className="btn-dark py-2" onClick={handlePublish}>
          Publish
        </button>
        <button
          disabled={isLoading}
          onClick={handleDraft}
          className="btn-light py-2"
        >
          Save Draft
        </button>
      </div>
    </header>
  );
};
