import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPage,
  selectTotalPages,
  selectGenres,
  //selectMovies,
} from '../redux/trands/trandingSelectors';
import {
  MoviesListContainer,
  MoviesList,
  MoviesItem,
  BackNextButtons,
  PaginationButtons,
  ImageContainer,
  GenresList,
  GenresListItem,
} from './MovieList.styled';
//import GenreMovieList from './GenreMovieList';
import {
  getTrandingMovies,
  getGenresMovies,
} from '../redux/trands/trandsOperations';

const MovieList = ({ movies, chooseMovieClick }) => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const genres = useSelector(selectGenres);
  const [pageTitle, setPageTitle] = useState(null);
  const [nextPage, setnextPage] = useState(false);

  const [moviesListByGenre, setMoviesListByGenre] = useState([]);
  const [tempFromDispatchedPage, setTempFromDispatchedPage] = useState(1);

  useEffect(() => {
    dispatch(getTrandingMovies({ page: page }));
    dispatch(getGenresMovies());

    if (page < totalPages) {
      setnextPage(true);
    } else setnextPage(false);
  }, [dispatch, page, totalPages]);

  const nextPageOnClick = () => {
    dispatch(getTrandingMovies({ page: page + 1 }));
  };

  const currentPageOnClick = e => {
    dispatch(getTrandingMovies({ page: e.target.textContent }));
  };

  const previousPageOnClick = () => {
    if (page > 1) dispatch(getTrandingMovies({ page: page - 1 }));
  };

  const chooseGenreClick = pageTitle => {
    setPageTitle(pageTitle);
    setTempFromDispatchedPage(1);
    FilteringMovies(1, pageTitle);
  };

  const FilteringMovies = (thisPage, pageTitle) => {
    if (moviesListByGenre.filter(e => e.page === thisPage).length === 0) {
      moviesListByGenre.push({
        page: thisPage,
        movies: movies.filter(movie => {
          if (movie.genre_ids) return movie.genre_ids.includes(pageTitle.id);
          else return movie.genres.includes(pageTitle.id);
        }),
      });
    }

    // while (moviesListByGenre[page - 1].movies.length < 20) {
    setTempFromDispatchedPage(page + 1);
    dispatch(getTrandingMovies({ page: tempFromDispatchedPage }));
    const moviesForAdding = movies.filter(movie => {
      if (movie.genre_ids) return movie.genre_ids.includes(pageTitle.id);
      else return movie.genres.includes(pageTitle.id);
    });
    const updatedMovies = moviesListByGenre.map(page => {
      if (page.page === thisPage) {
        return {
          page: thisPage,
          movies: { ...page.movies, ...moviesForAdding },
        };
      }
      return page;
    });
    setMoviesListByGenre(updatedMovies);
    console.log(updatedMovies);
    //}
  };

  const location = useLocation();
  if (movies === null) movies = [];
  return (
    <MoviesListContainer>
      <h1 className="movies-list-title">
        {pageTitle === null ? 'Tranding now' : pageTitle.name}
      </h1>
      {genres && (
        <GenresList>
          {genres.map(genre => {
            return (
              <GenresListItem
                key={genre.id}
                onClick={() => chooseGenreClick(genre)}
              >
                {genre.name}
              </GenresListItem>
            );
          })}
        </GenresList>
      )}
      {!pageTitle && (
        <MoviesList>
          {movies.map(movie => {
            return (
              <MoviesItem
                key={movie.id}
                onClick={() => chooseMovieClick(movie)}
              >
                <Link to={'movies/' + movie.id + ''} state={{ from: location }}>
                  <ImageContainer>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${process.env.KEY}`}
                      alt={`${movie.title}`}
                    />
                    <h3>{movie.title ?? movie.name}</h3>
                  </ImageContainer>
                </Link>
              </MoviesItem>
            );
          })}
        </MoviesList>
      )}

      {!pageTitle && nextPage && (
        <PaginationButtons>
          <BackNextButtons type="button" onClick={previousPageOnClick}>
            {'<'}
          </BackNextButtons>
          {page > 3 && (
            <>
              <BackNextButtons
                $primary
                type="button"
                onClick={currentPageOnClick}
              >
                {page - 3}
              </BackNextButtons>
              <BackNextButtons
                $primary
                type="button"
                onClick={currentPageOnClick}
              >
                {page - 2}
              </BackNextButtons>
              <BackNextButtons
                $primary
                type="button"
                onClick={currentPageOnClick}
              >
                {page - 1}
              </BackNextButtons>
            </>
          )}
          <BackNextButtons type="button" onClick={currentPageOnClick}>
            {page}
          </BackNextButtons>
          {page > 3 && (
            <>
              <BackNextButtons
                $primary
                type="button"
                onClick={currentPageOnClick}
              >
                {page + 3}
              </BackNextButtons>
              <BackNextButtons
                $primary
                type="button"
                onClick={currentPageOnClick}
              >
                {page + 2}
              </BackNextButtons>
              <BackNextButtons
                $primary
                type="button"
                onClick={currentPageOnClick}
              >
                {page + 1}
              </BackNextButtons>
            </>
          )}
          <BackNextButtons type="button" onClick={nextPageOnClick}>
            {'>'}
          </BackNextButtons>
        </PaginationButtons>
      )}
    </MoviesListContainer>
  );
};

export default MovieList;
