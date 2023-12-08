import Image from "next/image";
import AnimationWrapper from "./shared/animation-wrapper";

export const BlogEditor = () => {
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
  };

  return (
    <AnimationWrapper>
      <section>
        <div className="mx-auto w-full max-w-[900px]">
          <div className="relative aspect-video border-4 border-grey bg-white hover:opacity-80">
            <label htmlFor="banner" className="">
              <Image
                src="/images/blog-banner.png"
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
        </div>
      </section>
    </AnimationWrapper>
  );
};
