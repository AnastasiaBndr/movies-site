import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
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
} from '../MovieList/MovieList.styled';
import {
  getFilteredMoviesByGenre,
  getGenresMovies,
} from '../../redux/moviesList/moviesListOperations';

const FilteredMovieList = ({
  movies,
  genre,
  chooseGenreClick,
  chooseMovieClick,
}) => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const page = useSelector(selectPage);
  const genres = useSelector(selectGenres);
  const isLoading = useSelector(selectIsFetching);
  const location = useLocation();
  const [thisGenre, setThisGenre] = useState(
    JSON.parse(localStorage.getItem('current_genre'))
  );

  useEffect(() => {
    dispatch(
      getFilteredMoviesByGenre({ page: 1, with_genres: routeParams.id })
    );
    dispatch(getGenresMovies());
    if (localStorage.getItem('current_genre') !== null) {
      setThisGenre(JSON.parse(localStorage.getItem('current_genre')));
    } else {
      localStorage.setItem('current_genre', JSON.stringify(genre));
    }
  }, [dispatch, routeParams.id, genre]);

  const nextPageOnClick = () => {
    dispatch(
      getFilteredMoviesByGenre({ page: page + 1, with_genres: thisGenre.id })
    );
  };

  const currentPageOnClick = e => {
    dispatch(
      getFilteredMoviesByGenre({
        page: e.target.textContent,
        with_genres: routeParams.type,
      })
    );
  };

  const previousPageOnClick = () => {
    if (page > 1)
      dispatch(
        getFilteredMoviesByGenre({
          page: page - 1,
          with_genres: routeParams.type,
        })
      );
  };

  if (movies === null) movies = [];
  return (
    <MoviesListContainer>
      <h1 className="movies-list-title">{thisGenre.name}</h1>
      {genres && (
        <GenresList>
          {genres.map(genre => {
            return (
              <Link
                to={'/filter/' + genre.name + '/' + genre.id + ''}
                key={genre.id}
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

export default FilteredMovieList;
