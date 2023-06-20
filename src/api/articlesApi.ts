import { IFeedData } from '../types/articleApi.type';
import { Axios } from './api';

export const articleApi = {};

export const feedApi = {
  getGlobalFeed: (offset?: number, tag?: string) => {
    let url = '/articles?limit=10';
    if (offset) url + `&offset=${offset}`;
    if (tag) url + `&tag=${tag}`;
    const response = Axios.get<IFeedData>(url);
    return response;
  },
};
