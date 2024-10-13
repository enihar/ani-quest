type AnimeTitle = {
  romaji: string;
  english?: string;
  native?: string;
};

type CoverImage = {
  medium?: string;
  large?: string;
};

type StartDate = {
  year?: number;
  month?: number;
  day?: number;
};

type EndDate = {
  year?: number;
  month?: number;
  day?: number;
};

type Studio = {
  name: string;
};

type PageInfo = {
  total?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
};

export type AnimeMedia = {
  id: number;
  title: AnimeTitle;
  coverImage: CoverImage;
  genres: string[];
  averageScore?: number;
};

type AnimeDetails = {
  title: AnimeTitle;
  coverImage: CoverImage;
  description: string;
  genres: string[];
  averageScore?: number;
  episodes?: number;
  duration?: number;
  status?: string;
  startDate?: StartDate;
  endDate?: EndDate;
  studios: {
    nodes: Studio[];
  };
};

export type GetAnimeDetailsResponse = {
  Media: AnimeDetails;
};

export type GetAnimeListResponse = {
  Page: {
    pageInfo: PageInfo;
    media: AnimeMedia[];
  };
};
