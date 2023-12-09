"use client";

import { EditorProvider } from "@/context/editor-provider";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <EditorProvider>{children}</EditorProvider>
    </>
  );
};

export default EditorLayout;
