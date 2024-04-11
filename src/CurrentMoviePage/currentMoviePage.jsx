import { Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDetails } from '../redux/currentMovie/currentMovieOperations';
import { selectDetails } from '../redux/currentMovie/currentMovieSelectors';
import {
  MoviePageContainer,
  MovieTitle,
  MovieLargeImageItem,
  MoviePageNavigation,
  Description,
  Timer,
  PageContainer,
  MovieImageWrapper,
  GenresItem,
  GenresContainer
} from './currentMoviePage.styled';
import Video from './videos';
import { useDispatch, useSelector } from 'react-redux';

const CurrentMoviePage = ({ movie }) => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const [currentMovie, setCurrentMovie] = useState(movie);

  useEffect(() => {
    var localMovie;
    if (localStorage.getItem('current_movie') !== null) {
      localMovie = JSON.parse(localStorage.getItem('current_movie'));
      if (localMovie.media_type === 'tv')
        dispatch(getDetails({ id: localMovie.id, type: 'tv' }));
      else if (localMovie.media_type === 'movie')
        dispatch(getDetails({ id: localMovie.id, type: 'movie' }));
      setCurrentMovie(localMovie);
    } else {
      if (movie.media_type === 'tv')
        dispatch(getDetails({ id: movie.id, type: 'tv' }));
      else if (movie.media_type === 'movie')
        dispatch(getDetails({ id: movie.id, type: 'movie' }));
    };
  }, [dispatch, movie]);

  return (

    <PageContainer> {console.log(details)}
      <MoviePageContainer>
        <MovieImageWrapper>
          <Timer circlepersentage={currentMovie.vote_average}>{currentMovie.vote_average}</Timer>
          <MovieLargeImageItem
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}?api_key=${process.env.KEY}`}
            alt={currentMovie.name ?? currentMovie.title}
          />
        </MovieImageWrapper>

        <Description>
          <MovieTitle>
            {currentMovie.name ?? currentMovie.title}
          </MovieTitle>
          {details && <GenresContainer>
            {details.genres.map(genre => { return (<GenresItem key={genre.id}>{genre.name}</GenresItem>) })}
          </GenresContainer>}
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
      <button>Show similar</button>
    </PageContainer>
  );
};

export default CurrentMoviePage;
