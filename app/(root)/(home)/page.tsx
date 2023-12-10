import { BlogCard } from "@/components/blog-card";
import AnimationWrapper from "@/components/shared/animation-wrapper";
import { NoData } from "@/components/shared/no-data";
import { Tabs } from "@/components/shared/tabs";
import { SmallBlogCard } from "@/components/small-blog-card";
import { TagFilter } from "@/components/tag-filter";
import { getBlogs, getTrendingBlogs } from "@/lib/actions/blog.action";
import { HomePageUrlQueryParams } from "@/lib/actions/shared.types";
import { TrendingUp } from "lucide-react";

export default async function Home({ searchParams }: HomePageUrlQueryParams) {
  const latestBlogs = await getBlogs({
    limit: 5,
    tag: searchParams.tag,
  });
  const trendingBlogs = await getTrendingBlogs();

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <Tabs
            routes={["home", "trending blogs"]}
            defaultActiveTab={0}
            hiddenRoute={["trending blogs"]}
          >
            {latestBlogs.length > 0 ? (
              latestBlogs?.map((blog, index) => (
                <AnimationWrapper
                  key={index}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                  }}
                >
                  <BlogCard blog={blog} />
                </AnimationWrapper>
              ))
            ) : (
              <NoData message="No Blogs to show." />
            )}

            {trendingBlogs.length > 0 ? (
              trendingBlogs?.map((blog, index) => (
                <AnimationWrapper
                  key={index}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                  }}
                >
                  <SmallBlogCard blog={blog} index={index} />
                </AnimationWrapper>
              ))
            ) : (
              <NoData message="No Blogs to show." />
            )}
          </Tabs>
        </div>

        <div className="min-w-[40%] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden lg:min-w-[400px]">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="mb-8 text-xl font-medium">
                Stories from all interests
              </h1>

              <TagFilter />
            </div>

            <div>
              <h1 className="mb-8 flex items-center gap-2 text-xl font-medium">
                Trending <TrendingUp size={16} />
              </h1>
              {trendingBlogs.length > 0 ? (
                trendingBlogs?.map((blog, index) => (
                  <AnimationWrapper
                    key={index}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                    }}
                  >
                    <SmallBlogCard blog={blog} index={index} />
                  </AnimationWrapper>
                ))
              ) : (
                <NoData message="No Blogs to show." />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
