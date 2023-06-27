import { Axios } from './api';
import { AxiosResponse } from 'axios';
import {
  IMultipleArticlesResponse,
  INewArticleRequest,
  ISingleArticleResponse,
} from '../types/articleApi.type';

export const articleApi = {
  create: (articleData: INewArticleRequest) => {
    const response = Axios.post('/articles', articleData);
    return response;
  },
  read: (slug: string): Promise<AxiosResponse<ISingleArticleResponse>> => {
    const response = Axios.get(`/articles/${slug}`);
    return response;
  },
  update: () => {},
  delete: () => {},
};

export const feedApi = {
  getGlobalFeed: (offset?: number, tag?: string) => {
    let url = '/articles?limit=10';
    if (offset) url += `&offset=${offset}`;
    if (tag) url += `&tag=${tag}`;

    const response = Axios.get<IMultipleArticlesResponse>(url);
    return response;
  },
};
