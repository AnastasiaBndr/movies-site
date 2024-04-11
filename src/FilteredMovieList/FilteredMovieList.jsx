import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CirclesWithBar } from 'react-loader-spinner';
import { MovieItem, PaginationsButtons } from 'components/Scheme/schemes';
import {
    selectPage,
    selectGenres,
    selectIsFetching
} from '../redux/trands/trandingSelectors';
import {
    MoviesListContainer,
    GenresList,
    GenresListItem,
} from '../MovieList/MovieList.styled';
import {
    getFilteredMoviesByGenre,
    getGenresMovies,
} from '../redux/trands/trandsOperations';

const FilteredMovieList = ({ movies, genre, chooseGenreClick, chooseMovieClick }) => {
    const dispatch = useDispatch();
    const page = useSelector(selectPage);
    const genres = useSelector(selectGenres);
    const isLoading = useSelector(selectIsFetching);
    const location = useLocation();

    useEffect(() => {
        dispatch(getFilteredMoviesByGenre({ page: 1, with_genres: genre.id }));
        dispatch(getGenresMovies());

    }, [dispatch, genre.id]);

    const nextPageOnClick = () => {
        dispatch(getFilteredMoviesByGenre({ page: page + 1, with_genres: genre.id }));
    };

    const currentPageOnClick = e => {

        dispatch(getFilteredMoviesByGenre({ page: e.target.textContent, with_genres: genre.id }));
    };

    const previousPageOnClick = () => {
        if (page > 1) dispatch(getFilteredMoviesByGenre({ page: page - 1, with_genres: genre.id }));
    };

    if (movies === null) movies = [];
    return (
        <MoviesListContainer>
            <h1 className="movies-list-title">
                Tranding now
            </h1>
            {genres && (
                <GenresList>
                    {genres.map(genre => {
                        return (<Link to={'/movies/filter/' + genre.id + ''} state={{ from: location }}>
                            <GenresListItem
                                key={genre.id}
                                onClick={() => chooseGenreClick(genre)}
                            >
                                {genre.name}
                            </GenresListItem>
                        </Link>

                        );
                    })}
                </GenresList>
            )}
            <MovieItem
                movies={movies}
                chooseMovieClick={chooseMovieClick}
                location={location}
            />
            {isLoading && (
                <CirclesWithBar
                    height="100"
                    width="100"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    outerCircleColor=""
                    innerCircleColor=""
                    barColor=""
                    ariaLabel="circles-with-bar-loading"
                    position="absolute"
                    top="50%"
                    left="50%"
                    style={{ transform: 'translate(-50%, -50%)' }}
                />
            )}

            <PaginationsButtons
                previousPageOnClick={previousPageOnClick}
                currentPageOnClick={currentPageOnClick}
                page={page}
                nextPageOnClick={nextPageOnClick} />
        </MoviesListContainer>
    );
};

export default FilteredMovieList;
