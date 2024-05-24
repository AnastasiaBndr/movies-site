import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LogOutBtn from 'components/LogOutBtn/LogOutBtn';
import {
  Container,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  ProfilePicContainer,
} from './OtherUsersPage.styled';
import { getOtherUser, getOtherUserMovies } from '../../redux/users/usersOperations';
import { selectOtherUser, selectOtherUserMovies } from '../../redux/users/usersSelectors';
import { selectUser } from '../../redux/auth/authSelectors';

const OtherUsersPage = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();
  const userMovies = useSelector(selectOtherUserMovies);
  const currentUser = useSelector(selectUser);
  const user = useSelector(selectOtherUser);
  useEffect(() => {
    const { username } = routeParams;
    if (currentUser) {
      if (username === currentUser.username)
        navigate(`/current/user/${username}`);
    }

    dispatch(getOtherUser({ username: username }));

  }, [dispatch, routeParams, currentUser, navigate]);

  useEffect(() => {
    dispatch(getOtherUserMovies({ user: user }));
  }
    , [dispatch, user]);

  console.log(userMovies);
  return (
    user && <Container>
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

        <UserName>{user.name}</UserName>
        <UserRole>{user.username}</UserRole>
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

export default OtherUsersPage;
