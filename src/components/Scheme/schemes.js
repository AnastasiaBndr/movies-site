import React from 'react';
import { Link } from 'react-router-dom';
import {
  MoviesItem,
  BackNextButtons,
  ImageContainer,
  MoviesList,
  PaginationButtons,
} from './schemes.styled';

const MoviesListScheme = ({ movies, chooseMovieClick, location }) => {
  return (
    <MoviesList>
      {movies.map(movie => {
        var mediaType = null;
        if (movie.media_type === undefined) {
          mediaType = 'movie';
        }
        return (
          <MoviesItem
            key={movie.id || movie.globalId}
            onClick={() => chooseMovieClick(movie)}
          >
            <Link
              to={
                '/' +
                (movie.media_type === undefined
                  ? mediaType
                  : movie.media_type) +
                '/' +
                (movie.id || movie.globalId)
              }
              state={{ from: location }}
            >
              <ImageContainer>
                <img
                  src={`https://image.tmdb.org/t/p/w200${
                    movie.poster_path || movie.poster
                  }?api_key=${process.env.KEY}`}
                  alt={`${movie.title}`}
                />
                <h3>{movie.title || movie.name}</h3>
              </ImageContainer>
            </Link>
          </MoviesItem>
        );
      })}
    </MoviesList>
  );
};

const PaginationsButtons = ({
  previousPageOnClick,
  currentPageOnClick,
  page,
  nextPageOnClick,
}) => {
  return (
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
    </PaginationButtons>
  );
};

const MovieItem = ({ movie, chooseMovieClick, location }) => {
  var mediaType = null;
  if (movie.media_type === undefined) {
    mediaType = 'movie';
    return (
      <MoviesItem key={movie.id} onClick={() => chooseMovieClick(movie)}>
        <Link
          to={
            '/' +
            (movie.media_type === undefined ? mediaType : movie.media_type) +
            '/' +
            movie.id
          }
          state={{ from: location }}
        >
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
  }
};

export { MoviesListScheme, PaginationsButtons, MovieItem };
