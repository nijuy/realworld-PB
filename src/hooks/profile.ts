import { useQuery } from '@tanstack/react-query';
import { feedApi } from '../api/articlesApi';

export const useMyArticlesQuery = (username: string | undefined, offset: number) => {
  return useQuery({
    queryKey: ['myArticles', username],
    queryFn: async () => {
      try {
        if (username !== undefined) {
          const response = await feedApi.getFeed({ author: username, offset: offset });
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useFavoritedArticles = (username: string | undefined, offset: number) => {
  return useQuery({
    queryKey: ['favorited', username],
    queryFn: async () => {
      try {
        if (username !== undefined) {
          const response = await feedApi.getFeed({ favorited: username, offset: offset });
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
};
