"use client";

import { BlogEditor } from "@/components/blog-editor";
import BlogPublish from "@/components/blog-publish";
import { useEditor } from "@/context/editor-provider";

const EditorPage = () => {
  const { editorState } = useEditor();

  return editorState === "editor" ? <BlogEditor /> : <BlogPublish />;
};

export default EditorPage;
