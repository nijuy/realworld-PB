import axios from 'axios';

const BASE_URL = 'https://api.realworld.io/api/';

export const Axios = axios.create({
  baseURL: BASE_URL,
});
