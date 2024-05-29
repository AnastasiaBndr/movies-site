import { Outlet, NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getDetails,
  getVideos,
} from '../../redux/currentMovie/currentMovieOperations';
import { selectDetails } from '../../redux/currentMovie/currentMovieSelectors';
import "./styles.css";
import {
  MoviePageContainer,
  MovieTitle,
  MovieTagLine,
  MovieLargeImageItem,
  MoviePageNavigation,
  Description,
  Timer,
  PageContainer,
  MovieImageWrapper,
  GenresItem,
  GenresContainer,
  FinishedButton,
  MovieImageDescrWrapper

} from './currentMoviePage.styled';
import Cast from '../../components/Cast';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { addMovieToList, getUserMovies } from '../../redux/userMovies/userMoviesOperations';
import ShowSimilar from '../../components/ShowSimilar';

const CurrentMoviePage = () => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getDetails({ id: routeParams.id, type: routeParams.type }));
    dispatch(getVideos({ id: routeParams.id, type: routeParams.type }));
  }, [dispatch, routeParams.id, routeParams.type]);

  const addToList = ({ target }) => {

    dispatch(getUserMovies);

    dispatch(addMovieToList({
      globalId: details.id + "",
      name: details.name ? details.name : details.title,
      poster: details.poster_path,
      status: target.name,
      media_type: routeParams.type,
    }));

  }

  return (
    <PageContainer>
      {details && (
        <MoviePageContainer>
          <MovieImageDescrWrapper>
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
              <MovieTagLine>{details.tagline}</MovieTagLine>
              {details && (
                <GenresContainer>
                  {details.genres.map(genre => {
                    return <GenresItem key={genre.id}>{genre.name}</GenresItem>;
                  })}
                </GenresContainer>
              )}
              <img src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}?api_key=${process.env.KEY}`} alt={details.name ?? details.title} />
              <p>{details.overview}</p>
              <p>Language: {details.original_language}</p>
              <p>First air date: {details.first_air_date}</p>
              <p>Country: {details.origin_country}</p>
              <p>Popularity: {details.popularity}</p>
              <p>Vote average: {details.vote_average}</p>
            </Description>
          </MovieImageDescrWrapper>
          <Cast></Cast>

          <MoviePageNavigation>

            <NavLink className="movie-links-item" to={'reviews'}>
              <h3>Reviews</h3>
            </NavLink>
            <NavLink className="movie-links-item" to={'trailer'}>
              <h3>Trailer</h3>
            </NavLink>
          </MoviePageNavigation>
          <Outlet />
        </MoviePageContainer>
      )}

      <ShowSimilar />
    </PageContainer>
  );
};

export default CurrentMoviePage;
