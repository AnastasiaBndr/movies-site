import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CirclesWithBar } from 'react-loader-spinner';
import { MoviesListScheme, PaginationsButtons } from 'components/Scheme/schemes';
import {
  selectPage,
  selectGenres,
  selectIsFetching,
  selectMovies,
  selectTotalPages
} from '../../redux/moviesList/moviesListSelectors';
import {
  MoviesListContainer,
  GenresList,
  GenresListItem,
} from '../MovieList/MovieList.styled';
import {
  getFilteredMoviesByGenre,
  getFilteredMoviesByName,
  getGenresMovies,
} from '../../redux/moviesList/moviesListOperations';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../../redux/global/globalSlice';

const FilteredMovieList = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const genres = useSelector(selectGenres) || [];
  const isLoading = useSelector(selectIsFetching);
  const totalPages = useSelector(selectTotalPages);
  const { t } = useTranslation();
  const language = useSelector(selectLanguage) || 'en-US';

  const movies = useSelector(selectMovies) || [];
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useState({ id: params.get('id'), name: params.get('name'), genre: params.get('genre') });
  const [paginationButtonsVisible, setPaginationButtonsVisible] = useState(true);



  const getParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      id: params.get('id'),
      name: params.get('name'),
      genre: params.get('genre')
    };
  };

  useEffect(() => {
    if (page >= totalPages) {
      setPaginationButtonsVisible(false);
    } else setPaginationButtonsVisible(true)
  }, [page, totalPages])

  useEffect(() => {
    setSearchParams(getParams(location.search));
  }, [location.search]);


  useEffect(() => {
    if (searchParams.id) {
      dispatch(getFilteredMoviesByGenre({ page: 1, with_genres: searchParams.id, language: language }));

    } else if (searchParams.name) {
      dispatch(getFilteredMoviesByName({ page: 1, query: searchParams.name, language: language }));
    }

    dispatch(getGenresMovies({ language: language === 'en-US' ? 'en' : 'uk' }));
  }, [dispatch, searchParams, language]);


  const nextPageOnClick = () => {
    if (searchParams.id)
      dispatch(getFilteredMoviesByGenre({ page: page + 1, with_genres: searchParams.id, language: language }))
    else if (searchParams.name) dispatch(getFilteredMoviesByName({ page: page + 1, query: searchParams.name, language: language }))
  };

  const currentPageOnClick = e => {
    if (searchParams.id)
      dispatch(getFilteredMoviesByGenre({ page: e.target.textContent, with_genres: searchParams.id, language: language }));
    else if (searchParams.name) dispatch(getFilteredMoviesByName({ page: e.target.textContent, query: searchParams.name, language: language }))

  };

  const previousPageOnClick = () => {
    if (page > 1)
      if (searchParams.id)
        dispatch(getFilteredMoviesByGenre({ page: page - 1, with_genres: searchParams.id, language: language }));
      else if (searchParams.name) dispatch(getFilteredMoviesByName({ page: page - 1, query: searchParams.name, language: language }))
  };

  return (
    <MoviesListContainer>
      <h1 className="movies-list-title">{t('list_page.search_result')} "{params.get('name') || params.get('genre')}"</h1>
      <GenresList>
        {genres.map(genre => {
          return (
            <Link
              to={'/filter?genre=' + genre.name + '&id=' + genre.id + ''}
              key={genre.id}
              state={{ from: location }}
            >
              <GenresListItem>
                {genre.name}
              </GenresListItem>
            </Link>
          );
        })}
      </GenresList>
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

      {paginationButtonsVisible && <PaginationsButtons
        previousPageOnClick={previousPageOnClick}
        currentPageOnClick={currentPageOnClick}
        page={page}
        nextPageOnClick={nextPageOnClick}
      />}
    </MoviesListContainer>
  );
};

export default FilteredMovieList;
