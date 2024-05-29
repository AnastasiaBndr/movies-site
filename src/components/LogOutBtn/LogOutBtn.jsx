import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    StyledLogOutBtn,
} from './LogOutBtn.styled';

import { logOut } from '../../redux/auth/authOperations';
import { useTranslation } from 'react-i18next';

const LogOutBtn = ({ white, filled, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogOut = async () => {
        await dispatch(logOut());
        onClose?.();
        navigate('/');
    };

    return (
        <StyledLogOutBtn onClick={handleLogOut}>
            {t('side_bar.logout')}
        </StyledLogOutBtn>
    );
};

export default LogOutBtn;