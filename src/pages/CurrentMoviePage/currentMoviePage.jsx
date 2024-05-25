import { Outlet, NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getDetails,
  getVideos,
} from '../../redux/currentMovie/currentMovieOperations';
import { selectDetails } from '../../redux/currentMovie/currentMovieSelectors';
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
  FinishedButton
} from './currentMoviePage.styled';
import Video from './videos';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
//import { selectUser } from '../../redux/auth/authSelectors';
//import { selectUserMovies } from '../../redux/userMovies/userMoviesSelectors';
import { addMovieToList, getUserMovies } from '../../redux/userMovies/userMoviesOperations';

const CurrentMoviePage = ({ movie }) => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //const user = useSelector(selectUser);
  //const movies = useSelector(selectUserMovies);
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getDetails({ id: routeParams.id, type: routeParams.type }));
    dispatch(getVideos({ id: routeParams.id, type: routeParams.type }));
  }, [dispatch, routeParams.id, routeParams.type]);

  const addToList = ({ target }) => {

    dispatch(getUserMovies);
    switch (target.name) {
      case "favorite": {
        dispatch(addMovieToList({
          globalId: details.id + "",
          name: details.name ? details.name : details.title,
          poster: details.backdrop_path,
          status: target.name,
          media_type: routeParams.type,
        }));
        break;
      }
      case "dropped": {
        break;
      }
      case "watching": {
        break;
      }
      case "finished": {
        break;
      }
      default: return;
    }

  }

  return (
    <PageContainer>
      {details && (
        <MoviePageContainer>
          <div>
            <MovieImageWrapper>
              <Timer circlepersentage={details.vote_average}>
                {details.vote_average}
              </Timer>
              <MovieLargeImageItem
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}?api_key=${process.env.KEY}`}
                alt={details.name ?? details.title}
              />
            </MovieImageWrapper>
            {isLoggedIn && <div>
              <FinishedButton name="favorite" onClick={addToList}>Favorite</FinishedButton>
              <FinishedButton name="watching" onClick={addToList}>Watching</FinishedButton>
              <FinishedButton name="finished" onClick={addToList}>Finished</FinishedButton>
              <FinishedButton name="dropped" onClick={addToList}>Dropped</FinishedButton>
            </div>}
          </div>



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
