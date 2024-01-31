import { Outlet, Link, useLocation, NavLink } from 'react-router-dom';
import { useRef } from 'react';
import {
  MoviePageContainer,
  GoBackButton,
  MovieLargeImageItem,
  MoviePageNavigation,
  Description,
} from './currentMoviePage.styled';
import './styles.css';

const CurrentMoviePage = ({ movie }) => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/search');

  return (
    <>
      <Link to={backLinkLocationRef.current}>
        <GoBackButton>Go back</GoBackButton>
      </Link>
      <MoviePageContainer>
        <MovieLargeImageItem
          src={movie.largeImageFullPath}
          alt={movie.name ?? movie.title}
        />
        <Description>
          <h1>
            {movie.name ?? movie.title} /{' '}
            {movie.original_name ?? movie.original_title}
          </h1>
          {console.log(movie)}
          <p>{movie.overview}</p>
          <p>Language: {movie.original_language}</p>
          <p>First air date: {movie.first_air_date}</p>
          <p>Country: {movie.origin_country}</p>
          <p>Popularity: {movie.popularity}</p>
          <p>Vote average: {movie.vote_average}</p>

          <MoviePageNavigation>
            <NavLink className="movie-links-item" to={'cast'}>
              <h3>Cast</h3>
            </NavLink>
            <NavLink className="movie-links-item" to={'reviews'}>
              <h3>Reviews</h3>
            </NavLink>
            <NavLink className="movie-links-item" to={'videos'}>
              <h3>Videos</h3>
            </NavLink>
          </MoviePageNavigation>

          <Outlet />
        </Description>
      </MoviePageContainer>
    </>
  );
};

export default CurrentMoviePage;
