import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserPageContainer } from './UserPage.styled';
import { useEffect } from 'react';
import { selectUser } from '../redux/auth/authSelectors';
import { findByUserName } from '../redux/auth/authOperations';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const routeParams = useParams();
  useEffect(() => {
    const { username } = routeParams;
    dispatch(findByUserName({ username: username }));
  }, [dispatch, routeParams]);

  console.log(user)


  return (
    user && <UserPageContainer>hey ho</UserPageContainer>
  );
};

export default UserPage;
