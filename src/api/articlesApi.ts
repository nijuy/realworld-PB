import { Axios } from './api';
import { IMultipleArticlesResponse, INewArticleRequest } from '../types/articleApi.type';
import qs from 'qs';

export const articleApi = {
  create: (articleData: INewArticleRequest) => {
    const response = Axios.post('/articles', articleData);
    return response;
  },
  read: () => {},
  update: () => {},
  delete: () => {},
};

export const feedApi = {
  getFeed: ({
    offset,
    tag,
    author,
    favorited,
  }: {
    offset?: number;
    tag?: string;
    author?: string;
    favorited?: string;
  }) => {
    const response = Axios.get<IMultipleArticlesResponse>(
      `/articles?${qs.stringify({ limit: 10, offset, tag, author, favorited })}`,
    );

    return response;
  },
};
