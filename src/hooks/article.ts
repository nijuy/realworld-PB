import { useQuery } from '@tanstack/react-query';
import { articleApi, commentApi } from '../api/articlesApi';

export const useArticleQuery = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      try {
        if (slug !== undefined) {
          const response = await articleApi.read(slug);
          return response.data.article;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useCommentQuery = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['comment', slug],
    queryFn: async () => {
      try {
        if (slug !== undefined) {
          const response = await commentApi.read(slug);
          return response.data.comments;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
};
