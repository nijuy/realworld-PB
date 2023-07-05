import { Axios } from './api';
import { ITagData } from '../types/tagApi.type';

const tagApi = {
  get: () => {
    const response = Axios.get<ITagData>('/tags');
    return response;
  },
};

export default tagApi;
