import { IMultipleArticlesResponse, INewArticleRequest } from '../types/articleApi.type';
import { Axios } from './api';

export const articleApi = {
  create: (articleData: INewArticleRequest) => {
    const response = Axios.post('/articles', articleData);
    return response;
  },
  read: () => {},
  update: () => {},
  delete: () => {},
};
