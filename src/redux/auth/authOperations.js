import axios from 'axios';
import { thunkWrapperForUser } from '../helpers/thunkWrapperForUser';

const instance = axios.create({
  baseURL: 'https://movies-site-api.onrender.com/api',
  timeout: 1000,
  headers: { Authorization: '' },
});

export const register = thunkWrapperForUser('auth/register', data => {
  return instance.post('auth/register', data);
});
