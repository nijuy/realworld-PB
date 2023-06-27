import { Axios } from './api';
import { AxiosResponse } from 'axios';
import {
  IJoinUserData,
  IEditUserData,
  IGlobalUserData,
  ILoginUserData,
} from '../types/userApi.type';

export const userApi = {
  get: () => {
    const response = Axios.get<IGlobalUserData>('/user');
    return response;
  },
  modify: (userData: { user: IEditUserData }): Promise<AxiosResponse<IGlobalUserData>> => {
    const response = Axios.put('/user', userData);
    return response;
  },

  join: (userData: { user: IJoinUserData }): Promise<AxiosResponse<IGlobalUserData>> => {
    const response = Axios.post('/users', userData);
    return response;
  },

  login: (userData: { user: ILoginUserData }): Promise<AxiosResponse<IGlobalUserData>> => {
    const response = Axios.post('/users/login', userData);
    return response;
  },
};

export const profileApi = {
  read: () => {},
  follow: () => {},
  unfollow: () => {},
};
