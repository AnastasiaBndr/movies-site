import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    StyledLogOutBtn,
    StyledLogOutBtnIcon,
    StyledLogOutBtnText,
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
            <StyledLogOutBtnText>logout</StyledLogOutBtnText>
            <StyledLogOutBtnIcon
                $filled={filled}
                width="20"
                height="20"
                stroke="rgba(230, 83, 60, 1)"
            >
                <use
                    xlinkHref={
                        process.env.PUBLIC_URL + '/images/sprite/sprite.svg#icon-log-out'
                    }
                />
            </StyledLogOutBtnIcon>
        </StyledLogOutBtn>
    );
};

export default LogOutBtn;