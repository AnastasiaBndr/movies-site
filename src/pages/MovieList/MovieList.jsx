import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CirclesWithBar } from 'react-loader-spinner';
import { MoviesListScheme, PaginationsButtons } from 'components/Scheme/schemes';
import {
  selectPage,
  selectGenres,
  selectIsFetching,
} from '../../redux/moviesList/moviesListSelectors';
import {
  MoviesListContainer,
  GenresList,
  GenresListItem,
} from './MovieList.styled';
import {
  getMoviesList,
  getGenresMovies,
} from '../../redux/moviesList/moviesListOperations';

const MovieList = ({ movies, chooseMovieClick, chooseGenreClick }) => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const genres = useSelector(selectGenres);
  const isLoading = useSelector(selectIsFetching);

  useEffect(() => {
    dispatch(getMoviesList({ page: page }));
    dispatch(getGenresMovies());
  }, [dispatch, page]);

  const nextPageOnClick = () => {
    dispatch(getMoviesList({ page: page + 1 }));
  };

  const currentPageOnClick = e => {
    dispatch(getMoviesList({ page: e.target.textContent }));
  };

  const previousPageOnClick = () => {
    if (page > 1) dispatch(getMoviesList({ page: page - 1 }));
  };

  const location = useLocation();
  if (movies === null) movies = [];
  return (
    <MoviesListContainer>
      <h1 className="movies-list-title">Tranding now</h1>
      {genres && (
        <GenresList>
          {genres.map(genre => {
            return (
              <Link
                key={genre.id}
                to={'filter/' + genre.name + '/' + genre.id + ''}
                state={{ from: location }}
              >
                <GenresListItem onClick={() => chooseGenreClick(genre)}>
                  {genre.name}
                </GenresListItem>
              </Link>
            );
          })}
        </GenresList>
      )}
      <MoviesListScheme
        movies={movies}
        chooseMovieClick={chooseMovieClick}
        location={location}
      />
      {isLoading && (
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
      )}
      <PaginationsButtons
        previousPageOnClick={previousPageOnClick}
        currentPageOnClick={currentPageOnClick}
        page={page}
        nextPageOnClick={nextPageOnClick}
      />
    </MoviesListContainer>
  );
};

export default MovieList;
