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

export const logIn = thunkWrapperForUser('auth/logIn', data => {
  return instance.post('auth/auth', data);
});

export const findByEmail = thunkWrapperForUser('auth/findByEmail', data => {
  const { email } = data;
  return instance.get(`auth/email/${email}`);
});
export const findByUserName = thunkWrapperForUser(
  'auth/findByUsername',
  data => {
    const { username } = data;
    return instance.get(`auth/username/${username}`);
  }
);
