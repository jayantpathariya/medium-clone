export type BlogParams = {
  title: string;
  description: string;
  banner: string;
  content: string[] | any[];
  tags: string[];
  draft: boolean;
};

export type GetBlogsParams = {
  page?: number;
  limit?: number;
  tag?: string;
};

type HomePageUrlQueryParams = {
  searchParams: {
    tag?: string;
  };
};
