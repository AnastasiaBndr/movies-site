import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

import Header from 'components/Header';
import MovieList from 'pages/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies } from '../../redux/moviesList/moviesListSelectors';
import { selectDetails } from '../../redux/currentMovie/currentMovieSelectors';
import MainContainer from '../MainContainer/MainContainer';
import FilteredMovieList from 'pages/FilteredMovieList';
import LogIn from 'pages/LogIn';
import Register from 'pages/Register';
import UserPage from 'pages/UserPage/UserPage';
import OtherUserPage from 'pages/OtherUsersPage'
import SideBar from 'components/SideBar'
import { refreshCurrentUser } from '../../redux/auth/authOperations';
import { AppContainer } from './App.styled';
import Reviews from '../Reviews';
import Video from '../Videos';
const CurrentMoviePageLazy = lazy(() => import('pages/CurrentMoviePage'));

export default function App() {
  const trandingMovies = useSelector(selectMovies);
  const details = useSelector(selectDetails);

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
      <Header movies={trandingMovies} />
      <AppContainer>
        <SideBar className="side-bar">
        </SideBar>
        <MainContainer>
          <Routes>
            <Route
              path="/"
              element={
                <MovieList
                  movies={trandingMovies}
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
              path="/filter"
              element={
                <FilteredMovieList
                />
              }
            ></Route>
            <Route
              path=":type/:id"
              element={
                <CurrentMoviePageLazy details={details} />
              }
            >
              <Route path="reviews" element={<Reviews></Reviews>}> </Route>
              <Route path="trailer" element={<Video></Video>}> </Route>
            </Route>
          </Routes>
        </MainContainer>
      </AppContainer>


    </Suspense>
  );
}
