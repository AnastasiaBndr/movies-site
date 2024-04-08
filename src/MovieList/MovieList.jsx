import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CirclesWithBar } from 'react-loader-spinner';
import { MovieItem, PaginationButtons } from 'components/Scheme/schemes';
import {
  selectPage,
  selectTotalPages,
  selectGenres,
  selectIsFetching
} from '../redux/trands/trandingSelectors';
import {
  MoviesListContainer,
  GenresList,
  GenresListItem,
} from './MovieList.styled';
import {
  getTrandingMovies,
  getGenresMovies,
} from '../redux/trands/trandsOperations';

const MovieList = ({ movies, chooseMovieClick }) => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const genres = useSelector(selectGenres);
  const isLoading = useSelector(selectIsFetching);
  const [pageTitle, setPageTitle] = useState(null);
  const [nextPage, setnextPage] = useState(false);
  const [moviesByGenre, setMoviesByGenre] = useState([]);


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
    setMoviesByGenre([]); setPageTitle(pageTitle);

    FilteringMovies(pageTitle);

  };

  const FilteringMovies = async (pageTitle) => {
    const allMovies = [];
    let pageTemp = 1;
    while (allMovies.length <= 20 && pageTemp <= 30) {
      const response = await dispatch(getTrandingMovies({ page: pageTemp }));
      const moviesForAdding = response.payload.results;
      const filteredMovies = moviesForAdding.filter(movie => {
        if (movie.genre_ids) return movie.genre_ids.includes(pageTitle.id);
        else return movie.genres.includes(pageTitle.id);
      });
      allMovies.push(...filteredMovies);
      pageTemp++;
      if (allMovies.length >= 20) break;
    }

    setMoviesByGenre(allMovies);
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
            if (genre.name === "Documentary") return (null)
            else
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
        <MovieItem
          movies={movies}
          chooseMovieClick={chooseMovieClick}
          location={location}
        />
      )}
      {pageTitle && isLoading && (
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

      {pageTitle && (
        <MovieItem
          movies={moviesByGenre}
          chooseMovieClick={chooseMovieClick}
          location={location}
        />
      )}

      {!pageTitle && nextPage && (
        <PaginationButtons

          previousPageOnClick={previousPageOnClick}
          currentPageOnClick={currentPageOnClick}
          page={page}
          nextPageOnClick={nextPageOnClick} />
      )}
    </MoviesListContainer>
  );
};

export default MovieList;
