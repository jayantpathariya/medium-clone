import Image from "next/image";
import Link from "next/link";

export const EditorNavbar = () => {
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

      <p className="line-clamp-1 w-full text-black max-md:hidden">New Blog</p>

      <div className="ml-auto flex gap-4">
        <button className="btn-dark py-2">Publish</button>
        <button className="btn-light py-2">Save Draft</button>
      </div>
    </header>
  );
};
