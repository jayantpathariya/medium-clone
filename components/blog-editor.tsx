import { useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import AnimationWrapper from "./shared/animation-wrapper";
import { getImageUrl } from "@/lib/actions/image.action";
import { useEditor } from "@/context/editor-provider";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "@/lib/tools";
import { EditorNavbar } from "./editor-navbar";
const defaultBanner = "/images/blog-banner.png";

export const BlogEditor = () => {
  const { blog, setBlog, setTextEditor } = useEditor();

  const editorRef = useRef<EditorJS | null>(null);

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return console.log("No file selected");

    const toastId = toast.loading("Uploading banner...");
    try {
      const signedUrl = await getImageUrl(file.type, file.size);

      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setBlog((prev) => ({
        ...prev,
        banner: signedUrl,
      }));
      toast.success("Banner uploaded successfully", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Error uploading banner", { id: toastId });
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key } = e;

    if (key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setBlog((prev) => ({
      ...prev,
      title: textarea.value,
    }));
  };

  useEffect(() => {
    if (!editorRef.current?.isReady) {
      const editor = new EditorJS({
        holder: "textEditor",
        placeholder: "Write your blog...",
        data: {
          blocks: blog.content,
        },
        tools: EDITOR_TOOLS,
      });

      editorRef.current = editor;

      editor.isReady
        .then(() => {
          setTextEditor(editor);
        })
        .catch((error) => {
          console.log(`Editor.js initialization failed: ${error}`);
        });
    }
  }, [blog.content, setTextEditor]);

  return (
    <>
      <EditorNavbar />

      <AnimationWrapper>
        <section>
          <div className="mx-auto w-full max-w-[900px]">
            <div className="relative aspect-video border-4 border-grey bg-white hover:opacity-80">
              <label htmlFor="banner" className="">
                <Image
                  src={blog.banner ? blog.banner : defaultBanner}
                  width="1920"
                  height="1080"
                  alt="blog banner"
                  className="z-20"
                />
                <input
                  type="file"
                  id="banner"
                  accept="image/png, image/jpeg, image/jpg"
                  hidden
                  onChange={handleBannerChange}
                />
              </label>
            </div>

            <textarea
              defaultValue={blog.title}
              placeholder="Blog Title"
              className="mt-10 h-20 w-full resize-none text-4xl font-medium leading-tight outline-none placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            />

            <hr className="my-5 w-full opacity-10" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};
