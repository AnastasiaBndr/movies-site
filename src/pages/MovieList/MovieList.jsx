import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CirclesWithBar } from 'react-loader-spinner';
import { MoviesListScheme, PaginationsButtons } from 'components/Scheme/schemes';
import {
  selectPage,
  selectGenres,
  selectIsFetching,
  selectMovies
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
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../../redux/global/globalSlice';

const MovieList = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const genres = useSelector(selectGenres) || [];
  const isLoading = useSelector(selectIsFetching);
  const movies = useSelector(selectMovies) || [];
  const { t } = useTranslation();
  const language = useSelector(selectLanguage) || 'en-US';

  useEffect(() => {
    dispatch(getMoviesList({ page: page, language: language }));
    dispatch(getGenresMovies({ language: language === "en-US" ? 'en' : 'uk' }));
  }, [dispatch, page, language]);

  const nextPageOnClick = () => {
    dispatch(getMoviesList({ page: page + 1, language: language }));
  };

  const currentPageOnClick = e => {
    dispatch(getMoviesList({ page: e.target.textContent, language: language }));
  };

  const previousPageOnClick = () => {
    if (page > 1) dispatch(getMoviesList({ page: page - 1, language: language }));
  };

  const location = useLocation();
  return (
    <MoviesListContainer>
      <h1 className="movies-list-title">{t('list_page.tranding_now')}</h1>
      {genres && (
        <GenresList>
          {genres.map(genre => {
            return (
              <Link
                key={genre.id}
                to={'/filter?genre=' + genre.name + '&id=' + genre.id + ''}
                state={{ from: location }}
              >
                <GenresListItem>
                  {genre.name}
                </GenresListItem>
              </Link>
            );
          })}
        </GenresList>
      )}
      <MoviesListScheme
        movies={movies}
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
