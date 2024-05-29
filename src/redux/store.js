import { configureStore } from '@reduxjs/toolkit';
import { moviesListReducer } from './moviesList/moviesListSlice';
import { currentMovieReducer } from './currentMovie/currentMovieSlice';
import { userMoviesReducer } from './userMovies/userMoviesSlice';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { userReducer } from './users/usersSlice';
import { globalReducer } from './global/globalSlice';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const globalPersistConfig = {
  key: 'global',
  version: 1,
  storage,
  whitelist: ['language'],
};

export const store = configureStore({
  reducer: {
    movie: moviesListReducer,
    currentMovie: currentMovieReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    global: persistReducer(globalPersistConfig, globalReducer),
    movies: userMoviesReducer,
    users: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
