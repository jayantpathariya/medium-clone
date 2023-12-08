"use client";

import { BlogEditor } from "@/components/blog-editor";
import BlogPublish from "@/components/blog-publish";
import { useState } from "react";

const EditorPage = () => {
  const [editorState, setEditorState] = useState<"editor" | "publish">(
    "editor",
  );

  return editorState === "editor" ? <BlogEditor /> : <BlogPublish />;
};

export default EditorPage;
