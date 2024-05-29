import { StyledForm, StyledInput, StyledButton, StyledLabel, FormContainer, ButtonAndLink } from './Register.styled';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import { selectError } from '../../redux/auth/authSelectors';
import { useTranslation } from 'react-i18next';


const Register = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(false);
  const loggingError = useSelector(selectError);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register({ name, email, password, username }));

    if (!loggingError) {
      navigate('/login');
    }
    setEmail('');
    setName('');
    setUsername('');
    setPassword('');

  }

  const handleChange = ({ target }) => {
    const { value } = target;
    switch (target.name) {
      case 'name':
        {
          buttonEnabled(value, username, email, password);
          return setName(value);
        }
      case 'username':
        {
          buttonEnabled(name, username, value, password);
          return setUsername(value);
        }
      case 'password':
        {
          buttonEnabled(name, username, email, value);
          return setPassword(value);
        }
      case 'email':
        {
          buttonEnabled(name, username, value, password);
          return setEmail(value);
        }
      default: return;
    }
  }


  const buttonEnabled = (name, username, email, password) => {
    if (username.length > 0 && password.length > 0 && email.length > 0 && name.length > 0) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }

  }

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>{t('register.name')}:</StyledLabel>
        <StyledInput type="text" value={name} id="name" name="name" onChange={e => handleChange(e)} />
        <StyledLabel>{t('register.username')}:</StyledLabel>
        <StyledInput type="text" value={username} id="username" name="username" onChange={e => handleChange(e)} />
        <StyledLabel>{t('register.email')}:</StyledLabel>
        <StyledInput type="email" value={email} id="email" name="email" onChange={e => handleChange(e)} />
        <StyledLabel>{t('register.password')}:</StyledLabel>
        <StyledInput type="password" value={password} id="password" name="password" onChange={(e) => handleChange(e)} />
        <ButtonAndLink>
          <StyledButton type="submit" disabled={!enabled}>{t('register.register')}</StyledButton>
          <NavLink className="nav-element" to="/login">
            {t('register.have_an_account')}
          </NavLink>
        </ButtonAndLink>

      </StyledForm>
    </FormContainer>

  )
}

export default Register;
