import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPage,
  selectTotalPages,
} from '../redux/trands/trandingSelectors';

import {
  MoviesListContainer,
  MoviesList,
  MoviesItem,
  BackNextButtons,
  PageNumber,
  PaginationButtons,
} from './MovieList.styled';
import { getTrandingMovies } from '../redux/trands/trandsOperations';

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  const [nextPage, setnextPage] = useState(false);

  useEffect(() => {
    dispatch(getTrandingMovies({ page: page }));

    if (page < totalPages) {
      setnextPage(true);
    } else setnextPage(false);
  }, [dispatch, page, totalPages]);

  const nextPageOnClick = () => {
    dispatch(getTrandingMovies({ page: page + 1 }));
  };

  const previousPageOnClick = () => {
    if (page > 1) dispatch(getTrandingMovies({ page: page - 1 }));
  };

  const location = useLocation();
  if (movies === null) movies = [];
  return (
    <MoviesListContainer>
      <h1 className="movies-list-title">Tranding now</h1>
      <MoviesList>
        {movies.map(movie => {
          return (
            <MoviesItem key={movie.id} onClick={() => nextPageOnClick(movie)}>
              <Link to={'movies/' + movie.id + ''} state={{ from: location }}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${process.env.KEY}`}
                  alt=""
                />
                <h3>{movie.title ?? movie.name}</h3>
              </Link>
            </MoviesItem>
          );
        })}
      </MoviesList>
      {nextPage && (
        <PaginationButtons>
          <BackNextButtons type="button" onClick={previousPageOnClick}>
            {'<'}
          </BackNextButtons>
          <PageNumber>{page}</PageNumber>
          <BackNextButtons type="button" onClick={nextPageOnClick}>
            {'>'}
          </BackNextButtons>
        </PaginationButtons>
      )}
    </MoviesListContainer>
  );
};

export default MovieList;
