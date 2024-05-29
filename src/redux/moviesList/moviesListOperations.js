import axios from 'axios';
import { thunkWrapper } from '../helpers/thunkWrapper';

const TheMovieDB = axios.create({
  baseURL: 'https://api.themoviedb.org',
  timeout: 5000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4',
  },
});

export const getMoviesList = thunkWrapper('movies/list', data => {
  const { page, language } = data;
  return TheMovieDB.get(
    `/3/trending/all/week?language=${language}&page=${page}`
  );
});

export const getGenresMovies = thunkWrapper('movies/genres', data => {
  const { language } = data;
  console.log(language);
  return TheMovieDB.get(`/3/genre/movie/list?language=${language}`);
});

export const getFilteredMoviesByGenre = thunkWrapper(
  'movies/filteredByGenre',
  data => {
    const { page, with_genres, language } = data;
    return TheMovieDB.get(
      `/3/discover/movie?page=${page}&sort_by=popularity.desc&with_genres=${with_genres}&language=${language}`
    );
  }
);

export const getFilteredMoviesByName = thunkWrapper(
  'movies/filteredByName',
  data => {
    const { page, query, language } = data;
    return TheMovieDB.get(
      `/3/search/movie?page=${page}&sort_by=popularity.desc&query=${query}&language=${language}`
    );
  }
);

export const getSimilarMovies = thunkWrapper('movies/similar', data => {
  const { id, type, language } = data;
  return TheMovieDB.get(`3/${type}/${id}/similar?language=${language}`);
});
