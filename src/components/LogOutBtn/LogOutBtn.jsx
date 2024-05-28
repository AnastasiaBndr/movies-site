import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    StyledLogOutBtn,
} from './LogOutBtn.styled';

import { logOut } from '../../redux/auth/authOperations';

const LogOutBtn = ({ white, filled, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await dispatch(logOut());
        onClose?.();
        navigate('/');
    };

    return (
        <StyledLogOutBtn onClick={handleLogOut}>
            logout
        </StyledLogOutBtn>
    );
};

export default LogOutBtn;