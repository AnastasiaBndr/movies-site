import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectUser } from '../../redux/auth/authSelectors';
import { findByUserName } from '../../redux/auth/authOperations';
import { MoviesListScheme } from '../../components/Scheme/schemes';
import {
  Container,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  ProfilePicContainer,
  List, ListItem
} from './UserPage.styled';
import { getUserMovies } from '../../redux/userMovies/userMoviesOperations';
import { selectUserMovies } from '../../redux/userMovies/userMoviesSelectors';

const UserPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const routeParams = useParams();
  const userMovies = useSelector(selectUserMovies);
  const listOptions = ['favorite', "dropped", "watching", 'finished'];
  const navigate = useNavigate();
  useEffect(() => {
    const { username } = routeParams;
    dispatch(findByUserName({ username: username }));

  }, [dispatch, routeParams]);


  useEffect(() => {
    if (currentUser)
      dispatch(getUserMovies(currentUser));
  }
    , [dispatch, currentUser]);

  const chooseList = (option) => {
    navigate(`${option}`);
  }


  return (
    currentUser &&
    <Container>
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

      </UserInfo>

      <List>
        {listOptions.map(option => {
          return (
            <ListItem onClick={() => chooseList(option)}>
              {option}
            </ListItem>

          );
        })}
      </List>
      {!routeParams.type ? (userMovies && <MoviesListScheme movies={userMovies}>
      </MoviesListScheme>) : <Outlet />}


    </Container>
  );
};

export default UserPage;
