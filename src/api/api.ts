import axios from 'axios';
import { getToken } from '../services/TokenService';

const BASE_URL = 'https://api.realworld.io/api/';
const token = getToken();

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      Authorization: token && `Bearer ${token}`,
    },
    'Content-Type': 'application/json',
  },
});

export const updateHeader = (newToken: string) => {
  Axios.defaults.headers.common = {
    Authorization: `Bearer ${newToken}`,
  };
};
