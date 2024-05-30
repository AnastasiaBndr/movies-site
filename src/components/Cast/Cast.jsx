import { CastList, CastItem, ImageContainer } from './Cast.styled.js';
import { useDispatch, useSelector } from 'react-redux';
import './Cast.styled.js';
import { getCast } from '../../redux/currentMovie/currentMovieOperations.js';
import { selectLanguage } from '../../redux/global/globalSlice.js';
import { useEffect } from 'react';
import { selectCast } from '../../redux/currentMovie/currentMovieSelectors.js';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cast = () => {
  const cast = useSelector(selectCast) || [];
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch({});
  const params = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCast({ id: params.id, type: params.type, language: language }));
  }, [dispatch, params.id, params.type, language])

  console.log(cast);

  return (
    cast && <>
      <h2>{t('current_movie_page.cast')}</h2>
      <CastList>
        {cast.filter(actor => actor.profile_path).map(actor => {
          return (
            <CastItem className="cast-element" key={actor.id}>
              <ImageContainer><img
                className="actor-profile-picture"
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}?api_key=${process.env.KEY}`}
                alt={actor.name}
              />
                <h3>"{actor.character}"</h3>
                <h3>{actor.name}</h3></ImageContainer>
            </CastItem>
          );
        })}
      </CastList>
    </>

  );
};

export default Cast;
