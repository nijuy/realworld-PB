import { Axios } from './api';
import { AxiosResponse } from 'axios';
import {
  IMultipleArticlesResponse,
  INewArticleRequest,
  ISingleArticleResponse,
  INewCommentRequest,
  IMultipleCommentsResponse,
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
  delete: (slug: string) => {
    const response = Axios.delete(`/articles/${slug}`);
    return response;
  },
};

export const commentApi = {
  create: (slug: string, commentData: INewCommentRequest) => {
    const response = Axios.post(`/articles/${slug}/comments`, commentData);
    return response;
  },
  read: (slug: string): Promise<AxiosResponse<IMultipleCommentsResponse>> => {
    const response = Axios.get(`/articles/${slug}/comments`);
    return response;
  },
  delete: (slug: string, commentId: number) => {
    const response = Axios.delete(`/articles/${slug}/comments/${commentId}`);
    return response;
  },
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
