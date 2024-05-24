import axios from 'axios';
import { thunkWrapper } from '../helpers/thunkWrapper';

const instance = axios.create({
  baseURL: 'https://movies-site-api.onrender.com/api',
  timeout: 1000,
  headers: { Authorization: '' },
});

// const token = {
//   set(token) {
//     instance.defaults.headers.common.Authorization = `Bearer: ${token}`;
//   },
//   unset() {
//     instance.defaults.headers.common.Authorization = '';
//   },
// };

export const getUserMovies = thunkWrapper('movies/getUserMovies', data => {
  return instance.get('movies/', data);
});
