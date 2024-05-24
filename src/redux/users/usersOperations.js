import axios from 'axios';
import { thunkWrapperForUser } from '../helpers/thunkWrapperForUser';

const instance = axios.create({
  baseURL: 'https://movies-site-api.onrender.com/api',
  timeout: 1000,
});

export const getOtherUser = thunkWrapperForUser('users/getUser', data => {
  const { username } = data;
  return instance.get(`auth/username/${username}`);
});

export const getOtherUserMovies = thunkWrapperForUser('movies/get', data => {
  console.log(data);
  return instance.get('movies/', data);
});
