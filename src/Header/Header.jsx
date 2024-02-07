import { NavLink } from 'react-router-dom';
import { MainHeader, NavBar, HeaderItem, Hero, WatchNowLabel, HeroTitle, WatchNow, PlayIcon, HeroDescriptionContainer } from './Header.styled';
import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMovies } from '../redux/trands/trandingSelectors';
import { useEffect } from 'react';
import { useState } from 'react';

const Header = ({ chooseMovieClick }) => {
  const movies = useSelector(selectMovies);
  const [heroImage, setHeroImage] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (movies)
      setHeroImage(movies[Math.trunc(Math.random() * 20)])
  }, [movies])
  console.log(heroImage);
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
        <nav>
          <NavBar>
            <HeaderItem>
              <NavLink className="nav-element" to="/">
                Popular
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <NavLink className="nav-element" to="/search">
                Search
              </NavLink>
            </HeaderItem>
          </NavBar>
        </nav>
      </MainHeader>
    </>

  );
};

export default Header;
