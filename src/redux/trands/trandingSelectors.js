export const selectMovies = state => state.movie.results;
export const selectPage = state => state.movie.page;
export const selectTotalPages = state => state.movie.totalPages;
export const selectIsFetching = state => state.movie.isFetching;