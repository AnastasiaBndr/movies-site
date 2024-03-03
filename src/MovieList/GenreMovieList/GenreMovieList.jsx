import { MoviesList, MoviesItem, ImageContainer } from '../MovieList.styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTrandingMovies,
  getGenresMovies,
} from '../../redux/trands/trandsOperations';
import {
  selectMovies,
  selectTotalPages,
  selectPage,
} from '../../redux/trands/trandingSelectors';
import { Link } from 'react-router-dom';

const GenreMovieList = ({ pageTitle, chooseMovieClick, location }) => {
  const [moviesListByGenre, setMoviesListByGenre] = useState([]);
  const dispatchedMovies = useSelector(selectMovies);
  const dispatchedPage = useSelector(selectPage);
  const [page, setPage] = useState(1);
  const [tempFromDispatchedPage, setTempFromDispatchedPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrandingMovies({ page: tempFromDispatchedPage }));
  }, [dispatch, tempFromDispatchedPage]);

  //     if (moviesListByGenre.filter(e => e.page !== page).length === 0) {
  //       moviesListByGenre.push({
  //         page: page,
  //         movies: dispatchedMovies.filter(movie => {
  //           if (movie.genre_ids) return movie.genre_ids.includes(pageTitle.id);
  //           else return movie.genres.includes(pageTitle.id);
  //         }),
  //       });
  //     }
  //     dispatch(getTrandingMovies({ page: page }));

  //     var a = 0;
  //     moviesListByGenre[page - 1].movies.length < 20
  //     while (a < 5) {
  //       const nextPage = dispatchedPage + 1;
  //       dispatch(getTrandingMovies({ page: nextPage }));
  //       console.log(dispatchedMovies);
  //         setMoviesListByGenre({
  //           page: page,
  //           movies: {
  //             ...(moviesListByGenre[page - 1].movies +
  //               dispatchedMovies.movies.filter(movie => {
  //                 if (movie.genre_ids)
  //                   return movie.genre_ids.includes(pageTitle.id);
  //                 else return movie.genres.includes(pageTitle.id);
  //               })),
  //           },
  //         });
  //       a++;
  //     }
  //   };
  const FilteringMovies = page => {
    if (moviesListByGenre.filter(e => e.page === page).length === 0) {
      moviesListByGenre.push({
        page: page,
        movies: dispatchedMovies.filter(movie => {
          if (movie.genre_ids) return movie.genre_ids.includes(pageTitle.id);
          else return movie.genres.includes(pageTitle.id);
        }),
      });
    }
    console.log(moviesListByGenre[page - 1].movies.length < 20);

    // while (moviesListByGenre[page - 1].movies.length < 20) {

    // setTempFromDispatchedPage(dispatchedPage + 1);
    // dispatch(getTrandingMovies({ page: tempFromDispatchedPage }));
    // console.log(dispatchedMovies);

    //   setMoviesListByGenre({
    //     page: page,
    //     movies: {
    //       ...moviesListByGenre[page - 1].movies.concat(
    //         dispatchedMovies.filter(movie => {
    //           if (movie.genre_ids)
    //             return movie.genre_ids.includes(pageTitle.id);
    //           else return movie.genres.includes(pageTitle.id);
    //         })
    //       ),
    //     },
    //   });
    // }
  };

  FilteringMovies(1);

  return (
    <MoviesList>
      {/* {movies
        .filter(movie => {
          if (movie.genre_ids) return movie.genre_ids.includes(pageTitle.id);
          else return movie.genres.includes(pageTitle.id);
        })
        .map(movie => {
          return (
            <MoviesItem key={movie.id} onClick={() => chooseMovieClick(movie)}>
              <Link to={'movies/' + movie.id + ''} state={{ from: location }}>
                <ImageContainer>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}?api_key=${process.env.KEY}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title ?? movie.name}</h3>
                </ImageContainer>
              </Link>
            </MoviesItem>
          );
        })} */}
    </MoviesList>
  );
};

export default GenreMovieList;
