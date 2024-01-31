import { NavLink } from 'react-router-dom';
import { MainHeader, NavBar, HeaderItem } from './Header.styled';
import './styles.css';

const Header = () => {
  return (
    <>
      <MainHeader>
        <nav>
          <NavBar>
            <HeaderItem>
              <NavLink className="nav-element" to="/">
                Home
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <NavLink className="nav-element" to="/search">
                Movies
              </NavLink>
            </HeaderItem>
          </NavBar>
        </nav>
      </MainHeader>
    </>
  );
};

export default Header;
