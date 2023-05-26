import { Axios } from './api';
import { AxiosResponse } from 'axios';
import {
  IJoinUserData,
  IEditUserData,
  IGlobalUserData,
  ILoginUserData,
} from './types/userApi.type';

const userApi = {
  get: () => {
    const response = Axios.get<IGlobalUserData>('/user');
    return response;
  },
  modify: () => {
    const response = Axios.put<IEditUserData>('/user', {
      user: {
        email: 'string',
        password: 'string',
        username: 'string',
        bio: 'string',
        image: 'string',
      },
    });
    return response;
  },

  join: (userData: { user: IJoinUserData }) => {
    const response = Axios.post<IJoinUserData, IGlobalUserData>('/users', userData);
    return response;
  },

  login: (userData: ILoginUserData): Promise<AxiosResponse<IGlobalUserData>> => {
    const response = Axios.post('/users/login', {
      user: {
        email: userData.email,
        password: userData.password,
      },
    });
    return response;
  },
};

export default userApi;
