import { useQuery } from '@tanstack/react-query';
import { feedApi } from '../api/articlesApi';
import tagApi from '../api/tagApi';

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      try {
        const response = await tagApi.get();
        return response.data.tags;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useGlobalArticlesQuery = (offset: number) => {
  return useQuery({
    queryKey: ['globalArticles'],
    queryFn: async () => {
      try {
        const response = await feedApi.getFeed({ offset: offset });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 60000,
  });
};

export const useFollowingArticlesQuery = (username: string, offset: number) => {
  return useQuery({
    queryKey: ['followingArticles'],
    queryFn: async () => {
      try {
        if (username !== undefined) {
          const response = await feedApi.getFollowingFeed(offset);
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useTagArticlesQuery = (currentTag: string, offset: number) => {
  return useQuery({
    queryKey: ['tagArticles', currentTag],
    queryFn: async () => {
      try {
        const response = await feedApi.getFeed({ offset: offset, tag: currentTag });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: false,
  });
};
