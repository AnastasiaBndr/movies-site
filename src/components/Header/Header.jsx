import { NavLink } from 'react-router-dom';
import {
  MainHeader,
  NavBar,
  Hero,
  HeroTitle,
  WatchNow,
  PlayIcon,
  HeroDescriptionContainer,
  GoBackButton,
} from './Header.styled';
import './styles.css';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies } from '../../redux/moviesList/moviesListSelectors';
import { refreshCurrentUser } from '../../redux/auth/authOperations';

const Header = ({ chooseMovieClick }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const movies = useSelector(selectMovies);
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const [heroImage, setHeroImage] = useState({});
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('header_image')) {
      if (movies) {
        var image = null;
        while (!image || image.media_type === undefined || !image.media_type) {
          image = movies[Math.trunc(Math.random() * 20)];
        }
        setHeroImage(image);
        localStorage.setItem('header_image', JSON.stringify(image));
      }
    } else {
      setHeroImage(JSON.parse(localStorage.getItem('header_image')));
    }
  }, [movies]);

  useEffect(() => {
    dispatch(refreshCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Hero>
        <HeroDescriptionContainer>
          <HeroTitle>{heroImage.name ?? heroImage.title}</HeroTitle>
          <WatchNow
            onClick={() => {
              chooseMovieClick(heroImage);
            }}
            id="watch-now-button"
          >
            <Link
              to={heroImage.media_type + '/' + heroImage.id}
              state={{ from: location }}
              className="watch-now"
            >
              <PlayIcon>
                <use
                  xlinkHref={
                    process.env.PUBLIC_URL + '/images/sprite.svg#icon-play'
                  }
                  fill="white"
                />
              </PlayIcon>
              Watch now!
            </Link>
          </WatchNow>
        </HeroDescriptionContainer>

        <img
          src={`https://image.tmdb.org/t/p/w500${heroImage.poster_path}?api_key=${process.env.KEY}`}
          alt={heroImage.name ?? heroImage.title}
        />
      </Hero>
      <MainHeader>
        {location.pathname === '/' ? (
          <></>
        ) : (
          <Link to={backLinkLocationRef.current}>
            <GoBackButton>Go back</GoBackButton>
          </Link>
        )}
        <NavBar>
          <NavLink className="nav-element" to="/">
            Popular
          </NavLink>
          {!isLoggedIn && <NavLink className="nav-element" to="/login">
            Log in
          </NavLink>}
          {isLoggedIn && currentUser && <NavLink className="nav-element" to={`/current/user/${currentUser.username}`}>
            {currentUser.name}
          </NavLink>}
        </NavBar>
      </MainHeader>
    </>
  );
};

export default Header;
