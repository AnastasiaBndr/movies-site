import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectUser } from '../../redux/auth/authSelectors';
import { findByUserName } from '../../redux/auth/authOperations';
import LogOutBtn from 'components/LogOutBtn/LogOutBtn';
import {
  Container,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  ProfilePicContainer,
} from './UserPage.styled';
import { getUserMovies } from '../../redux/userMovies/userMoviesOperations';
import { selectUserMovies } from '../../redux/userMovies/userMoviesSelectors';

const UserPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const routeParams = useParams();
  const userMovies = useSelector(selectUserMovies)
  useEffect(() => {
    const { username } = routeParams;
    console.log(username);
    dispatch(findByUserName({ username: username }));

  }, [dispatch, routeParams]);

  useEffect(() => {
    dispatch(getUserMovies({ user: currentUser }));
  }
    , [dispatch, currentUser]);

  return (
    currentUser && <Container>
      <UserInfo>
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

        <UserName>{currentUser.name}</UserName>
        <UserRole>{currentUser.username}</UserRole>
        <div>
          {userMovies && userMovies.map(movie => {
            return (<p key={movie.id}>{movie.name}</p>)
          })}
        </div>
        <LogOutBtn>Logout</LogOutBtn>
      </UserInfo>
    </Container>
  );
};

export default UserPage;
