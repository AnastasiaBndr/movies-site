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
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectMovies } from '../redux/trands/trandingSelectors';

const Header = ({ chooseMovieClick }) => {
  const location = useLocation();
  const movies = useSelector(selectMovies);
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const [heroImage, setHeroImage] = useState({});

  console.log(movies);

  useEffect(() => {
    if (!localStorage.getItem('header_image')) {
      if (movies) {
        const image = movies[Math.trunc(Math.random() * 20)];
        setHeroImage(image);
        console.log(image + 'YOOOOOOOOOO');
        localStorage.setItem('header_image', JSON.stringify(image));
      }
    } else {
      setHeroImage(JSON.parse(localStorage.getItem('header_image')));
    }
  }, [movies]);
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
        <nav>
          <NavBar>
            <NavLink className="nav-element" to="/">
              Popular
            </NavLink>
          </NavBar>
        </nav>
      </MainHeader>
    </>
  );
};

export default Header;
