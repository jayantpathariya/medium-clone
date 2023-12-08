import { EditorNavbar } from "@/components/editor-navbar";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <EditorNavbar />
      {children}
    </>
  );
};

export default EditorLayout;
