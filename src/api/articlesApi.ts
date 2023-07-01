import { Axios } from './api';
import { AxiosResponse } from 'axios';
import {
  IMultipleArticlesResponse,
  INewArticleRequest,
  ISingleArticleResponse,
  INewCommentRequest,
  IMultipleCommentsResponse,
} from '../types/articleApi.type';
import qs from 'qs';

export const articleApi = {
  create: (articleData: INewArticleRequest) => {
    const response = Axios.post('/articles', articleData);
    return response;
  },
  read: (slug: string): Promise<AxiosResponse<ISingleArticleResponse>> => {
    const response = Axios.get(`/articles/${slug}`);
    return response;
  },
  update: (
    slug: string,
    articleData: INewArticleRequest,
  ): Promise<AxiosResponse<ISingleArticleResponse>> => {
    const response = Axios.put(`/articles/${slug}`, articleData);
    return response;
  },
  delete: (slug: string) => {
    const response = Axios.delete(`/articles/${slug}`);
    return response;
  },
  favorite: (slug: string) => {
    const response = Axios.post(`/articles/${slug}/favorite`);
    return response;
  },
  unfavorite: (slug: string) => {
    const response = Axios.delete(`/articles/${slug}/favorite`);
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
  getFollowingFeed: (offset: number): Promise<AxiosResponse<IMultipleArticlesResponse>> => {
    const response = Axios.get(`/articles/feed?${qs.stringify({ limit: 10, offset })}`);
    return response;
  },
};
