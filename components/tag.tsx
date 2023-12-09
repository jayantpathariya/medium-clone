import { useEditor } from "@/context/editor-provider";
import { X } from "lucide-react";

type TagProps = {
  name: string;
};

export const Tag = ({ name }: TagProps) => {
  const { setBlog } = useEditor();

  const handleTagDelete = () => {
    setBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== name),
    }));
  };

  return (
    <div className="relative mr-2 inline-block rounded-full bg-white p-2 px-5 pr-10 hover:bg-opacity-50 ">
      <p>
        {name}
        <button
          onClick={handleTagDelete}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
        >
          <X className="pointer-events-none" size={20} />
        </button>
      </p>
    </div>
  );
};
