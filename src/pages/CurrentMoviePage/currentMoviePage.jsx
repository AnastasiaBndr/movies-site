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
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '../../redux/global/globalSlice';

const CurrentMoviePage = () => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const routeParams = useParams();
  const { t } = useTranslation();
  const language = useSelector(selectLanguage) || 'en-US';

  useEffect(() => {
    dispatch(getDetails({ id: routeParams.id, type: routeParams.type, language: language }));
    dispatch(getVideos({ id: routeParams.id, type: routeParams.type, language: language }));
  }, [dispatch, routeParams.id, routeParams.type, language]);

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
                <FinishedButton name="favorite" onClick={addToList}>{t('current_movie_page.favorite')}</FinishedButton>
                <FinishedButton name="watching" onClick={addToList}>{t('current_movie_page.watching')}</FinishedButton>
                <FinishedButton name="finished" onClick={addToList}>{t('current_movie_page.finished')}</FinishedButton>
                <FinishedButton name="dropped" onClick={addToList}>{t('current_movie_page.dropped')}</FinishedButton>
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
              <p>{t('current_movie_page.language')}: {details.original_language}</p>
              <p>{t('current_movie_page.first_air_date')}: {details.first_air_date}</p>
              <p>{t('current_movie_page.country')}: {details.origin_country}</p>
              <p>{t('current_movie_page.popularity')}: {details.popularity}</p>
              <p>{t('current_movie_page.vote_average')}: {details.vote_average}</p>
            </Description>
          </MovieImageDescrWrapper>
          <Cast movie={details}></Cast>

          <MoviePageNavigation>

            <NavLink className="movie-links-item" to={'reviews'}>
              <h3>{t('current_movie_page.reviews')}</h3>
            </NavLink>
            <NavLink className="movie-links-item" to={'trailer'}>
              <h3>{t('current_movie_page.trailer')}</h3>
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
