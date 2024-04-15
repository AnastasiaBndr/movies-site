import { Outlet, NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getDetails,
  getVideos,
} from '../redux/currentMovie/currentMovieOperations';
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
  GenresContainer,
} from './currentMoviePage.styled';
import Video from './videos';
import { useDispatch, useSelector } from 'react-redux';

const CurrentMoviePage = ({ movie }) => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const routeParams = useParams();
  console.log(routeParams);

  useEffect(() => {
    dispatch(getDetails({ id: routeParams.id, type: routeParams.type }));
    dispatch(getVideos({ id: routeParams.id, type: routeParams.type }));
  }, [dispatch, routeParams.id, routeParams.type]);

  return (
    <PageContainer>
      {details && (
        <MoviePageContainer>
          <MovieImageWrapper>
            <Timer $circlepersentage={details.vote_average}>
              {details.vote_average}
            </Timer>
            <MovieLargeImageItem
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}?api_key=${process.env.KEY}`}
              alt={details.name ?? details.title}
            />
          </MovieImageWrapper>

          <Description>
            <MovieTitle>{details.name ?? details.title}</MovieTitle>
            {details && (
              <GenresContainer>
                {details.genres.map(genre => {
                  return <GenresItem key={genre.id}>{genre.name}</GenresItem>;
                })}
              </GenresContainer>
            )}
            <p>{details.overview}</p>
            <p>Language: {details.original_language}</p>
            <p>First air date: {details.first_air_date}</p>
            <p>Country: {details.origin_country}</p>
            <p>Popularity: {details.popularity}</p>
            <p>Vote average: {details.vote_average}</p>
            <Video></Video>
            <MoviePageNavigation>
              <NavLink className="movie-links-item" to={'cast'}>
                <h3>Cast</h3>
              </NavLink>
              <NavLink className="movie-links-item" to={'reviews'}>
                <h3>Reviews</h3>
              </NavLink>
            </MoviePageNavigation>
            <Outlet />
          </Description>
        </MoviePageContainer>
      )}

      <button>Show similar</button>
    </PageContainer>
  );
};

export default CurrentMoviePage;
