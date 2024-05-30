import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies } from '../../redux/moviesList/moviesListSelectors';
import { selectDetails } from '../../redux/currentMovie/currentMovieSelectors';
import MainContainer from '../MainContainer/MainContainer';
import LogIn from 'pages/LogIn';
import Register from 'pages/Register';
import OtherUserPage from 'pages/OtherUsersPage'
import SideBar from 'components/SideBar'
import { refreshCurrentUser } from '../../redux/auth/authOperations';
import { AppContainer } from './App.styled';
import Reviews from '../Reviews';
import Video from '../Videos';
import { setLanguage } from '../../redux/global/globalSlice';
import UserList from 'pages/UserList/UserList';
import Loader from 'components/Loader/Loader';
import MovieList from 'pages/MovieList/MovieList';
import FilteredMovieList from 'pages/FilteredMovieList/FilteredMovieList';

const CurrentMoviePageLazy = lazy(() => import('pages/CurrentMoviePage'));
const UserPageLazy = lazy(() => import('pages/UserPage'));

export default function App() {
  const trandingMovies = useSelector(selectMovies);
  const details = useSelector(selectDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage('en-US'));
    dispatch(refreshCurrentUser());

  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <Loader />
      }
    >
      <Header movies={trandingMovies} />
      <AppContainer>
        <SideBar className="side-bar">
        </SideBar>
        <MainContainer>
          <Routes>
            <Route path="/" element={<MovieList movies={trandingMovies} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/:username" element={<OtherUserPage />} />
            <Route path="current/user/:username" element={<UserPageLazy />}>
              <Route path=":type" element={<UserList></UserList>}></Route>
            </Route>
            <Route path="/filter" element={<FilteredMovieList />}></Route>
            <Route path=":type/:id" element={<CurrentMoviePageLazy details={details} />}>
              <Route path="reviews" element={<Reviews></Reviews>}> </Route>
              <Route path="trailer" element={<Video></Video>}> </Route>
            </Route>
          </Routes>
        </MainContainer>
      </AppContainer>


    </Suspense>
  );
}
