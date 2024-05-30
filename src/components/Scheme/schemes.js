import React from 'react';
import { Link } from 'react-router-dom';
import {
  MoviesItem,
  BackNextButtons,
  ImageContainer,
  MoviesList,
  PaginationButtons,
  DeleteButton,
  SvgDelete,
} from './schemes.styled';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../redux/global/globalSlice';

const MoviesListScheme = ({ movies, location }) => {
  const language = useSelector(selectLanguage) || 'en-US';
  return (
    movies && (
      <MoviesList>
        {language === 'en-US'
          ? movies.map(movie => {
              var mediaType = null;
              if (movie.media_type === undefined) {
                mediaType = 'movie';
              }
              return (
                <MoviesItem key={movie.id || movie.globalId}>
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
            })
          : movies
              .filter(
                movie =>
                  movie.poster_path &&
                  movie.overview.includes(
                    'а' || 'і' || 'ф' || 'н' || 'п' || 'к'
                  )
              )
              .map(movie => {
                var mediaType = null;
                if (movie.media_type === undefined) {
                  mediaType = 'movie';
                }
                return (
                  <MoviesItem key={movie.id || movie.globalId}>
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
    )
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

const UserFilteresListScheme = ({ movies, onDelete }) => {
  return (
    movies && (
      <MoviesList>
        {movies.map(movie => {
          const mediaType =
            movie.media_type === undefined ? 'movie' : movie.media_type;
          return (
            <MoviesItem key={movie.id || movie.globalId}>
              <DeleteButton onClick={() => onDelete(movie)}>
                <SvgDelete viewBox="0 0 32 32">
                  <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                </SvgDelete>
              </DeleteButton>
              <Link to={`/${mediaType}/${movie.id || movie.globalId}`}>
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
    )
  );
};

export { MoviesListScheme, PaginationsButtons, UserFilteresListScheme };
