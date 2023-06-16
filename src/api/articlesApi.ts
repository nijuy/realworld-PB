import { IFeedData } from '../types/articleApi.type';
import { Axios } from './api';

export const articleApi = {};

export const feedApi = {
  getGlobalFeed: () => {
    const response = Axios.get<IFeedData>('/articles');
    return response;
  },
};
