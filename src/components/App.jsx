import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

import Header from 'components/Header';
import Cast from 'Cast';
import MovieList from 'pages/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies } from '../redux/moviesList/moviesListSelectors';
import { selectDetails } from '../redux/currentMovie/currentMovieSelectors';
import MainContainer from './MainContainer/MainContainer';
import FilteredMovieList from 'pages/FilteredMovieList';
import LogIn from 'pages/LogIn';
import Register from 'pages/Register';
import UserPage from 'pages/UserPage/UserPage';
import OtherUserPage from 'pages/OtherUsersPage'
import { refreshCurrentUser } from '../redux/auth/authOperations';

const CurrentMoviePageLazy = lazy(() => import('pages/CurrentMoviePage'));

export default function App() {
  const trandingMovies = useSelector(selectMovies);
  const details = useSelector(selectDetails);
  const [currentMovie, setCurrentMovie] = useState({});
  const [genre, setGenre] = useState({});

  const chooseMovieClick = async movie => {
    await localStorage.setItem('current_movie', JSON.stringify(movie));
    await setCurrentMovie(movie);
  };

  const chooseGenreClick = async genre => {
    await localStorage.setItem('current_genre', JSON.stringify(genre));
    await setGenre(genre);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshCurrentUser());
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
          position="absolute"
          top="50%"
          left="50%"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      }
    >
      <Header chooseMovieClick={chooseMovieClick} movies={trandingMovies} />
      <MainContainer>
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                movies={trandingMovies}
                chooseMovieClick={chooseMovieClick}
                chooseGenreClick={chooseGenreClick}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LogIn
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
              />
            }
          />
          <Route
            path="/user/:username"
            element={
              <OtherUserPage
              />
            }
          />
          <Route
            path="current/user/:username"
            element={
              <UserPage
              />
            }
          />
          <Route
            path="/filter/:type/:id"
            element={
              <FilteredMovieList
                genre={genre}
                movies={trandingMovies}
                chooseMovieClick={chooseMovieClick}
                chooseGenreClick={chooseGenreClick}
              />
            }
          ></Route>
          <Route
            path=":type/:id"
            element={
              <CurrentMoviePageLazy movie={currentMovie} details={details} />
            }
          >
            <Route path="cast" element={<Cast></Cast>}></Route>
          </Route>
        </Routes>
      </MainContainer>

    </Suspense>
  );
}
