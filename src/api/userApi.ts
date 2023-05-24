import { Axios } from './api';
import { IJoinUserData, IEditUserData, IGlobalUserData } from './types/userApi.type';

export const getUser = async () => {
  const response = await Axios.get<IGlobalUserData>('/user');
  return response.data;
};

export const setUser = async () => {
  const response = await Axios.put<IEditUserData>('/user', {
    user: {
      email: 'string',
      password: 'string',
      username: 'string',
      bio: 'string',
      image: 'string',
    },
  });
  return response.data;
};

export const joinUser = async (user: IJoinUserData) => {
  const response = await Axios.post<IJoinUserData, IGlobalUserData>('/users', {
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });

  console.log(response);
  //   return response.data;
};
