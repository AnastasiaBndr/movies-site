import { configureStore } from '@reduxjs/toolkit';
import { trandingReducer } from './trands/trandsSlice';
import { currentMovieReducer } from './currentMovie/currentMovieSlice';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const store = configureStore({
    reducer: {
    movie: trandingReducer,
    currentMovie:currentMovieReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;