import {
    MainPart, TopPart, ProfilePicContainer, UserAvatar, BottomPart, NavBar,
    InputSideBar, InputSideBarItem, SubmitButton, SearchSVG
} from './SideBar.styled';
import { selectUser, selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import './styles.css';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const SideBar = ({ className }) => {
    const currentUser = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef(null);

    const updateSidebarPosition = () => {
        const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
        const scrollY = window.scrollY;

        if (scrollY >= headerHeight) {
            document.querySelector('.side-bar').style.top = `${scrollY}px`;
        } else {
            document.querySelector('.side-bar').style.top = `${headerHeight}px`;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', updateSidebarPosition);
        return () => window.removeEventListener('scroll', updateSidebarPosition);
    }, []);

    useEffect(() => {
        updateSidebarPosition(); // Встановлюємо початкове значення
    }, []);

    useEffect(() => {
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        };

        const handleGesture = () => {
            if (touchEndX - touchStartX > 50) {
                setIsOpen(true);
                document.body.classList.add('lock-scroll');
                document.querySelector('.overlay').classList.add('show');
            }
            if (touchStartX - touchEndX > 50) {
                setIsOpen(false);
                document.body.classList.remove('lock-scroll');
                document.querySelector('.overlay').classList.remove('show');
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    const handleOnChange = ({ target }) => {
        setSearch(target.value);
    }

    const onSearch = () => {
        navigate('/filter?name=' + search);
    }

    return (
        <>
            <div className="overlay"></div>
            <div className={`${className} ${isOpen ? 'open' : ''}`}>
                <MainPart>
                    <InputSideBar>
                        <SubmitButton type="button" onClick={onSearch}>
                            <SearchSVG viewBox="0 0 50 50">
                                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 
                                11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 
                                30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 
                                C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 
                                3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 
                                28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                            </SearchSVG>
                        </SubmitButton>
                        <InputSideBarItem onChange={handleOnChange} placeholder={t('side_bar.search_placeholder')}></InputSideBarItem>
                    </InputSideBar>

                    <TopPart>
                        <ProfilePicContainer>
                            <UserAvatar fill="#494949">
                                <use
                                    xlinkHref={
                                        process.env.PUBLIC_URL +
                                        '/images/sprite.svg#icon-avatar'
                                    }
                                ></use>
                            </UserAvatar>
                        </ProfilePicContainer>
                        {isLoggedIn && <p>{currentUser.name}</p>}
                        {!isLoggedIn && <p>{t('side_bar.here_may_be_your_name')}</p>}
                        {isLoggedIn && <p>{currentUser.username}</p>}
                    </TopPart>
                    <BottomPart>
                        <NavBar>
                            <NavLink className="nav-element" to="/">
                                {t('side_bar.home')}
                            </NavLink>
                            {isLoggedIn && currentUser && <NavLink className="nav-element" to={`/current/user/${currentUser.username}`}>
                                {t('side_bar.profile')}
                            </NavLink>}
                            {!isLoggedIn && !currentUser && <NavLink className="nav-element" to={`/login`}>
                                {t('side_bar.profile')}
                            </NavLink>}
                        </NavBar>
                        {isLoggedIn && <NavBar>
                            <NavLink className="nav-element" to={`/current/user/${currentUser.username}/favorite`}>{t('side_bar.favorite')}</NavLink>
                            <NavLink className="nav-element" to={`/current/user/${currentUser.username}/dropped`}>{t('side_bar.dropped')}</NavLink>
                            <NavLink className="nav-element" to={`/current/user/${currentUser.username}/watching`}>{t('side_bar.watching')}</NavLink>
                            <NavLink className="nav-element" to={`/current/user/${currentUser.username}/finished`}>{t('side_bar.finished')}</NavLink>
                        </NavBar>}

                    </BottomPart>
                    {isLoggedIn && <LogOutBtn></LogOutBtn>}
                </MainPart>
            </div>
        </>
    );
};

export default SideBar;
