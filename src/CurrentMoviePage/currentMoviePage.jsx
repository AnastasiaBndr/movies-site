import { Outlet, Link, useLocation, NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMovieById } from '../redux/currentMovie/currentMovieOperations';
import {
  MoviePageContainer,
  GoBackButton,
  MovieLargeImageItem,
  MoviePageNavigation,
  Description,
} from './currentMoviePage.styled';
import Video from './videos';
import { useDispatch } from 'react-redux';

const CurrentMoviePage = ({ movie }) => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/search');
  const [currentMovie, setCurrentMovie] = useState(movie);
  const dispatch = useDispatch();

  useEffect(() => {
    var localMovie;
    if (localStorage.getItem('current_movie') !== null) {
      localMovie = JSON.parse(localStorage.getItem('current_movie'));
      setCurrentMovie(localMovie);
      dispatch(getMovieById(localMovie.id));
    }
  }, [setCurrentMovie, dispatch]);

  return (
    <>
      <Link to={backLinkLocationRef.current}>
        <GoBackButton>Go back</GoBackButton>
      </Link>
      <MoviePageContainer>
        <MovieLargeImageItem
          src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}?api_key=${process.env.KEY}`}
          alt={currentMovie.name ?? currentMovie.title}
        />
        <Description>
          <h1>
            {currentMovie.name ?? currentMovie.title} /{' '}
            {currentMovie.original_name ?? currentMovie.original_title}
          </h1>
          <p>{currentMovie.overview}</p>
          <p>Language: {currentMovie.original_language}</p>
          <p>First air date: {currentMovie.first_air_date}</p>
          <p>Country: {currentMovie.origin_country}</p>
          <p>Popularity: {currentMovie.popularity}</p>
          <p>Vote average: {currentMovie.vote_average}</p>
          <MoviePageNavigation>
            <NavLink className="movie-links-item" to={'cast'}>
              <h3>Cast</h3>
            </NavLink>
            <NavLink className="movie-links-item" to={'reviews'}>
              <h3>Reviews</h3>
            </NavLink>
          </MoviePageNavigation>
          <Outlet />
          <Video currentMovie={currentMovie}></Video>
        </Description>
      </MoviePageContainer>
    </>
  );
};

export default CurrentMoviePage;
