import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { selectUser } from '../../redux/auth/authSelectors';
import { findByUserName } from '../../redux/auth/authOperations';
import {
  Container,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  ProfilePicContainer,
  List,
  ListItem,
} from './UserPage.styled';
import {
  deleteMovieFromList,
  getUserMovies,
} from '../../redux/userMovies/userMoviesOperations';
import { selectUserMovies } from '../../redux/userMovies/userMoviesSelectors';

import { UserFilteresListScheme } from 'components/Scheme/schemes';
import { selectLanguage } from '../../redux/global/globalSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const routeParams = useParams();

  const userMovies = useSelector(selectUserMovies) || [];
  useMemo(() => {
    dispatch(getUserMovies());
  }, [dispatch]);

  const listOptions = {
    'en-US': ['Favorite', 'Dropped', 'Watching', 'Finished'],
    'uk-UKR': ['Улюблене', 'Кинуте', 'Переглядаю', 'Завершено'],
  };
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);

  useEffect(() => {
    const { username } = routeParams;
    dispatch(findByUserName({ username: username }));
  }, [dispatch, routeParams]);

  const onDelete = movie => {
    dispatch(deleteMovieFromList({ id: movie._id }));
    dispatch(getUserMovies());
  };

  const chooseList = option => {
    switch (option) {
      case 'Улюблене': {
        navigate('favorite');
        return 'favorite';
      }
      case 'Кинуте': {
        navigate('dropped');
        return 'favorite';
      }
      case 'Переглядаю': {
        navigate('watching');
        return 'favorite';
      }
      case 'Завершено': {
        navigate('finished');
        return 'favorite';
      }
      default:
        navigate(`${option.toLowerCase()}`);
    }
  };

  return (
    currentUser && (
      <Container>
        <UserInfo>
          <ProfilePicContainer>
            <UserAvatar fill="#494949">
              <use
                xlinkHref={
                  process.env.PUBLIC_URL + '/images/sprite.svg#icon-avatar'
                }
              ></use>
            </UserAvatar>
          </ProfilePicContainer>

          <UserName>{currentUser.name}</UserName>
          <UserRole>{currentUser.username}</UserRole>
        </UserInfo>

        <List>
          {language === 'en-US'
            ? listOptions['en-US'].map(option => {
                return (
                  <ListItem key={option} onClick={() => chooseList(option)}>
                    {option}
                  </ListItem>
                );
              })
            : listOptions['uk-UKR'].map(option => {
                return (
                  <ListItem key={option} onClick={() => chooseList(option)}>
                    {option}
                  </ListItem>
                );
              })}
        </List>

        {!routeParams.type ? (
          userMovies && (
            <UserFilteresListScheme
              onDelete={onDelete}
              movies={userMovies}
            ></UserFilteresListScheme>
          )
        ) : (
          <Outlet />
        )}
      </Container>
    )
  );
};

export default UserPage;
