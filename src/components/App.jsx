import React, { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

import Header from 'Header';
import Cast from 'Cast';
import MovieList from 'MovieList';
import { useSelector } from 'react-redux';
import { selectMovies } from '../redux/moviesList/moviesListSelectors';
import { selectDetails } from '../redux/currentMovie/currentMovieSelectors';
import FilteredMovieList from 'FilteredMovieList';
import LogIn from 'LogIn';
import Register from 'Register';

const CurrentMoviePageLazy = lazy(() => import('CurrentMoviePage'));

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
    </Suspense>
  );
}
