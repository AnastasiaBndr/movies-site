import React from 'react';
import { Link } from 'react-router-dom';
import {
  MoviesItem,
  BackNextButtons,
  ImageContainer,
} from '../../MovieList/MovieList.styled';

const MovieItem = ({ movies, chooseMovieClick, location }) => {
  return (
    <MoviesList>
      {movies.map(movie => {
        return (
          <MoviesItem key={movie.id} onClick={() => chooseMovieClick(movie)}>
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
  );
};

const PaginationButtons = ({
  previousPageOnClick,
  currentPageOnClick,
  page,
  nextPageOnClick,
}) => {
  <PaginationButtons>
    <BackNextButtons type="button" onClick={previousPageOnClick}>
      {'<'}
    </BackNextButtons>
    {page > 3 && (
      <>
        <BackNextButtons $primary type="button" onClick={currentPageOnClick}>
          {page - 3}
        </BackNextButtons>
        <BackNextButtons $primary type="button" onClick={currentPageOnClick}>
          {page - 2}
        </BackNextButtons>
        <BackNextButtons $primary type="button" onClick={currentPageOnClick}>
          {page - 1}
        </BackNextButtons>
      </>
    )}
    <BackNextButtons type="button" onClick={currentPageOnClick}>
      {page}
    </BackNextButtons>
    {page > 3 && (
      <>
        <BackNextButtons $primary type="button" onClick={currentPageOnClick}>
          {page + 3}
        </BackNextButtons>
        <BackNextButtons $primary type="button" onClick={currentPageOnClick}>
          {page + 2}
        </BackNextButtons>
        <BackNextButtons $primary type="button" onClick={currentPageOnClick}>
          {page + 1}
        </BackNextButtons>
      </>
    )}
    <BackNextButtons type="button" onClick={nextPageOnClick}>
      {'>'}
    </BackNextButtons>
  </PaginationButtons>;
};

export { MovieItem, PaginationButtons };
