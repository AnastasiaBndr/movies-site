import { useDispatch, useSelector } from "react-redux";
import { getSimilarMovies } from "../../redux/moviesList/moviesListOperations";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { selectMovies } from "../../redux/moviesList/moviesListSelectors";

import { MoviesList, MoviesItem, ImageContainer, MoviesTitle } from './ShowSimilar.styled'
import { useTranslation } from "react-i18next";
import { selectLanguage } from "../../redux/global/globalSlice";

const ShowSimilar = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(selectMovies) || [];
    const { t } = useTranslation();
    const language = useSelector(selectLanguage) || 'en-US';

    useEffect(() => {
        dispatch(getSimilarMovies({ id: params.id, type: params.type, language: language }));
    }, [dispatch, params.id, params.type, language]);

    return (<><MoviesTitle>{t('current_movie_page.you_may_also_like')}</MoviesTitle>
        <MoviesList>
            {language === 'uk-UKR' ? movies.filter(movie => movie.poster_path && movie.overview.includes('а' || 'і' || 'ф' || 'н' || 'п' || 'к')).map(movie => {
                return (
                    <MoviesItem key={movie.id || movie.globalId}>
                        <Link
                            to={'/' + (movie.media_type || params.type) + '/' +
                                (movie.id || movie.globalId)
                            }
                        >
                            <ImageContainer>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path || movie.poster
                                        }?api_key=${process.env.KEY}`}
                                    alt={`${movie.title}`}
                                />
                                <h3>{movie.title || movie.name}</h3>
                            </ImageContainer>
                        </Link>
                    </MoviesItem>
                );
            }) : movies.filter(movie => movie.poster_path).map(movie => {
                return (
                    <MoviesItem key={movie.id || movie.globalId}>
                        <Link
                            to={'/' + (movie.media_type || params.type) + '/' +
                                (movie.id || movie.globalId)
                            }
                        >
                            <ImageContainer>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path || movie.poster
                                        }?api_key=${process.env.KEY}`}
                                    alt={`${movie.title}`}
                                />
                                <h3>{movie.title || movie.name}</h3>
                            </ImageContainer>
                        </Link>
                    </MoviesItem>
                );
            })}
        </MoviesList></>);
}

export default ShowSimilar;