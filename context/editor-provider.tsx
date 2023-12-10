import { createContext, useContext, useState } from "react";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";

type BlogType = {
  title: string;
  banner: string;
  content: OutputBlockData[];
  tags: string[];
  description: string;
  author: {
    personal_info: {
      name?: string;
      avatar?: string;
      bio?: string;
    };
  };
};

const blogStructure: BlogType = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  description: "",
  author: {
    personal_info: {},
  },
};

type EditorState = "editor" | "publish";

type EditorContextType = {
  blog: typeof blogStructure;
  setBlog: React.Dispatch<React.SetStateAction<typeof blogStructure>>;
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  textEditor: EditorJS | null;
  setTextEditor: React.Dispatch<React.SetStateAction<EditorJS | null>>;
};

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState<EditorState>("editor");
  const [textEditor, setTextEditor] = useState<EditorJS | null>(null);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (context === null) {
    throw new Error("useEditor must be used within a EditorProvider");
  }

  return context;
};
