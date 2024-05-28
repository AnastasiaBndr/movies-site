import { MainPart, TopPart, ProfilePicContainer, UserAvatar, BottomPart, NavBar } from './SideBar.styled';
import { selectUser, selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import './styles.css';
import { useEffect, useState, useRef } from 'react';

const SideBar = ({ className }) => {
    const currentUser = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);

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

    return (
        <>
            <div className="overlay"></div>
            <div className={`${className} ${isOpen ? 'open' : ''}`}>
                <MainPart>
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
                        {!isLoggedIn && <p>Here may be your name ;)</p>}
                        {isLoggedIn && <p>{currentUser.username}</p>}
                    </TopPart>
                    <BottomPart>
                        <NavBar>
                            <NavLink className="nav-element" to="/">
                                Home
                            </NavLink>
                            {isLoggedIn && currentUser && <NavLink className="nav-element" to={`/current/user/${currentUser.username}`}>
                                Profile
                            </NavLink>}
                            {!isLoggedIn && !currentUser && <NavLink className="nav-element" to={`/login`}>
                                Profile
                            </NavLink>}
                        </NavBar>
                        <NavBar>
                            <NavLink className="nav-element" to="/">Favorite</NavLink>
                            <NavLink className="nav-element" to="/">Dropped</NavLink>
                            <NavLink className="nav-element" to="/">Watching</NavLink>
                        </NavBar>
                    </BottomPart>
                    <LogOutBtn>LogOut</LogOutBtn>
                </MainPart>
            </div>
        </>
    );
};

export default SideBar;
