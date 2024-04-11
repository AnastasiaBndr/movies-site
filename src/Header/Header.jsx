import { NavLink } from 'react-router-dom';
import { MainHeader, NavBar, Hero, HeroTitle, WatchNow, PlayIcon, HeroDescriptionContainer, GoBackButton } from './Header.styled';
import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMovies } from '../redux/trands/trandingSelectors';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const Header = ({ chooseMovieClick }) => {
  const movies = useSelector(selectMovies);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const [heroImage, setHeroImage] = useState({});

  useEffect(() => {
    if (movies)
      setHeroImage(movies[Math.trunc(Math.random() * 20)])
  }, [movies])
  return (
    <>
      <Hero>
        <HeroDescriptionContainer>
          <HeroTitle>{heroImage.name ?? heroImage.title}</HeroTitle>
          <WatchNow onClick={() => { chooseMovieClick(heroImage) }} id="watch-now-button">
            <Link to={'movies/' + heroImage.id + ''} state={{ from: location }} className="watch-now">
              <PlayIcon>
                <use
                  xlinkHref={
                    process.env.PUBLIC_URL +
                    '/images/sprite.svg#icon-play'
                  }
                  fill="white"
                />
              </PlayIcon>
              Watch now!
            </Link>
          </WatchNow>
        </HeroDescriptionContainer>

        <img src={`https://image.tmdb.org/t/p/w500${heroImage.poster_path}?api_key=${process.env.KEY}`} alt={heroImage.name ?? heroImage.title} />
      </Hero>
      <MainHeader>
        {location.pathname === '/' ? <></> : <Link to={backLinkLocationRef.current}>
          <GoBackButton>Go back</GoBackButton>
        </Link>}
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
