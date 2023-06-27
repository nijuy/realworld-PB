import { IFeedData } from '../types/articleApi.type';
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
  getGlobalFeed: (offset?: number, tag?: string) => {
    let url = '/articles?limit=10';
    if (offset) url += `&offset=${offset}`;
    if (tag) url += `&tag=${tag}`;

    const response = Axios.get<IFeedData>(url);
    return response;
  },
};
