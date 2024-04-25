import axios from 'axios';
import { thunkWrapper } from '../helpers/thunkWrapper';

const TheMovieDB = axios.create({
  baseURL: 'https://api.themoviedb.org',
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4',
  },
});

export const getVideos = thunkWrapper('movie/videos', data => {
  const { id, type } = data;
  return TheMovieDB.get(`/3/${type}/${id}/videos`);
});

export const getDetails = thunkWrapper('movie/details', data => {
  const { id, type } = data;
  return TheMovieDB.get(`/3/${type}/${id}`);
});
