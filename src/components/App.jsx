import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

import Header from 'Header';
import MovieList from 'MovieList';
import Search from 'Search';
import { useSelector } from 'react-redux';
import { selectMovies } from '../redux/trands/trandingSelectors';

// const CurrentMoviePageLazy = lazy(() => import('CurrentMoviePage'));

// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [searchMovies, setSearchMovies] = useState([]);
//   const [trandingMovies, setTrandingMovies] = useState([]);
//   const [currentMovie, setCurrentMovie] = useState({});
//   const [currentInput, setCurrentInput] = useState('');
//   const [nextPageIsVisible, setnextPageIsVisible] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams('');
//   const [nextPageForSearchVisible, setnextPageForSearchVisible] =
//     useState(true);

//   useEffect(() => {
//     const initialQuery = new URLSearchParams(window.location.search);
//     if (initialQuery) {
//       apiComponent
//         .fetchMoviesbyName(
//           initialQuery.get('query'),
//           apiComponent.links.searchMovieUrl
//         )
//         .then(data => {
//           data.results
//             .filter(movie => movie.poster_path !== null)
//             .map(movie => {
//               movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${
//                 movie.poster_path
//               }?api_key=${apiComponent.getkey()}`;
//               movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${
//                 movie.poster_path
//               }?api_key=${apiComponent.getkey()}`;
//               return movie;
//             });
//           setSearchMovies(data.results);
//           setnextPageIsVisible(true);
//         })
//         .catch();
//     }
//     apiComponent
//       .fetchMoviesbyName('', apiComponent.links.trendingUrl)
//       .then(data => {
//         data.results
//           .filter(movie => movie.poster_path !== null)
//           .map(movie => {
//             movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${
//               movie.poster_path
//             }?api_key=${apiComponent.getkey()}`;
//             movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${
//               movie.poster_path
//             }?api_key=${apiComponent.getkey()}`;
//             return movie;
//           });
//         setMovies(data.results);
//         setTrandingMovies(data.results);
//         setnextPageIsVisible(true);
//         if (localStorage.getItem('current_movie') !== null)
//           setCurrentMovie(JSON.parse(localStorage.getItem('current_movie')));
//       })
//       .catch();
//   }, []);

//   const onClickMovie = async movie => {
//     await localStorage.setItem('current_movie', JSON.stringify(movie));
//     await setCurrentMovie(movie);
//   };

//   const handlenextPage = async () => {
//     apiComponent.page = apiComponent.page + 1;

//     await apiComponent
//       .fetchMoviesbyName(currentInput, apiComponent.links.trendingUrl)
//       .then(data => {
//         data.results
//           .filter(movie => movie.poster_path !== null)
//           .map(movie => {
//             movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${
//               movie.poster_path
//             }?api_key=${apiComponent.getkey()}`;
//             movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${
//               movie.poster_path
//             }?api_key=${apiComponent.getkey()}`;
//             return movie;
//           });
//         setTrandingMovies([...trandingMovies, ...data.results]);
//       })
//       .catch();
//   };

//   const handlenextPageForSearch = async () => {
//     apiComponent.page = apiComponent.page + 1;

//     var moviesTemp;
//     var page;

//     await apiComponent
//       .fetchMoviesbyName(currentInput, apiComponent.links.searchMovieUrl)
//       .then(data => {
//         data.results
//           .filter(movie => movie.poster_path !== null)
//           .map(movie => {
//             movie.smallImageFullPath = `https://image.tmdb.org/t/p/w200${
//               movie.poster_path
//             }?api_key=${apiComponent.getkey()}`;
//             movie.largeImageFullPath = `https://image.tmdb.org/t/p/w400${
//               movie.poster_path
//             }?api_key=${apiComponent.getkey()}`;
//             return movie;
//           });
//         setMovies([...movies, ...data.results]);
//         moviesTemp = data.total_pages;
//         page = data.page;
//       })
//       .catch();

//     if (page < moviesTemp) {
//       setnextPageForSearchVisible(true);
//     } else setnextPageForSearchVisible(false);
//   };

//   const onClickSubmit = async evt => {
//     evt.preventDefault();

//     localStorage.setItem('searchParams', searchParams.get('query'));
//     apiComponent.page = 1;
//     var moviesTemp;

//     try {
//       const data = await apiComponent.fetchMoviesbyName(
//         searchParams.get('query'),
//         apiComponent.links.searchMovieUrl
//       );
//       const updatedMovies = data.results
//         .filter(movie => movie.poster_path !== null)
//         .map(movie => ({
//           ...movie,
//           smallImageFullPath: `https://image.tmdb.org/t/p/w200${
//             movie.poster_path
//           }?api_key=${apiComponent.getkey()}`,
//           largeImageFullPath: `https://image.tmdb.org/t/p/w400${
//             movie.poster_path
//           }?api_key=${apiComponent.getkey()}`,
//         }));

//       moviesTemp = data.total_pages;
//       setSearchMovies(updatedMovies);
//       setMovies(updatedMovies);
//       setCurrentInput(searchParams.get('query'));
//       localStorage.setItem('search-movies', JSON.stringify(updatedMovies));
//     } catch (error) {}

//     if (apiComponent.page < moviesTemp) {
//       setnextPageIsVisible(true);
//     } else setnextPageIsVisible(false);
//   };

//   const updateQueryString = evt => {
//     if (evt.target.value === null) setSearchParams('');
//     else setSearchParams({ query: evt.target.value });
//   };

//   return (
//     <Suspense
//       fallback={
//         <CirclesWithBar
//           height="100"
//           width="100"
//           color="#4fa94d"
//           wrapperStyle={{}}
//           wrapperClass=""
//           visible={true}
//           outerCircleColor=""
//           innerCircleColor=""
//           barColor=""
//           ariaLabel="circles-with-bar-loading"
//           position="absolute"
//           top="50%"
//           left="50%"
//           style={{ transform: 'translate(-50%, -50%)' }}
//         />
//       }
//     >
//       <Header />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <MovieList
//               movies={trandingMovies}
//               click={onClickMovie}
//               nextPageIsVisible={nextPageIsVisible}
//               nextPage={handlenextPage}
//             />
//           }
//         />
//         <Route
//           path="search"
//           element={
//             <Search
//               movies={searchMovies}
//               onClickSubmit={onClickSubmit}
//               inputValue={searchParams.get('query')}
//               click={onClickMovie}
//               nextPage={handlenextPageForSearch}
//               nextPageIsVisible={nextPageForSearchVisible}
//               query={updateQueryString}
//               searchParams={searchParams.get('query')}
//             />
//           }
//         ></Route>
//         <Route
//           path="search/:id"
//           element={<CurrentMoviePageLazy movie={currentMovie} />}
//         >
//           <Route
//             path={'cast'}
//             element={<Cast movie={currentMovie} apiComponent={apiComponent} />}
//           />
//           <Route
//             path={'reviews'}
//             element={
//               <Reviews movie={currentMovie} apiComponent={apiComponent} />
//             }
//           />
//           <Route
//             path={'videos'}
//             element={
//               <Videos movie={currentMovie} apiComponent={apiComponent} />
//             }
//           />
//         </Route>
//         <Route
//           path="movies/:id"
//           element={<CurrentMoviePageLazy movie={currentMovie} />}
//         >
//           <Route
//             path={'cast'}
//             element={<Cast movie={currentMovie} apiComponent={apiComponent} />}
//           />
//           <Route
//             path={'reviews'}
//             element={
//               <Reviews movie={currentMovie} apiComponent={apiComponent} />
//             }
//           />
//           <Route
//             path={'videos'}
//             element={
//               <Videos movie={currentMovie} apiComponent={apiComponent} />
//             }
//           />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }

export default function App() {
  const trandingMovies = useSelector(selectMovies);
  return (
    <Suspense
      fallback={
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
      }
    >
      <Header />
      <Routes>
        <Route path="/" element={<MovieList movies={trandingMovies} />} />
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </Suspense>
  );
}
