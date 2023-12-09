import AnimationWrapper from "@/components/shared/animation-wrapper";
import { Tabs } from "@/components/shared/tabs";

export default function Home() {
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <Tabs
            routes={["home", "trending blogs"]}
            defaultActiveTab={0}
            hiddenRoute={["trending blogs"]}
          >
            <h1>Latest Blogs</h1>
            <h1>Trending Blogs</h1>
          </Tabs>
        </div>

        <div></div>
      </section>
    </AnimationWrapper>
  );
}
