import { Axios } from './api';
import { IMultipleArticlesResponse, INewArticleRequest } from '../types/articleApi.type';

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
    let url = '/articles?limit=10';
    if (offset) url += `&offset=${offset}`;
    if (tag) url += `&tag=${tag}`;

    const response = Axios.get<IMultipleArticlesResponse>(url);
    return response;
  },
};
