import { StyledForm, StyledInput, StyledButton, StyledLabel, FormContainer, ButtonAndLink, StyledAlert } from '../Register/Register.styled';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, findByEmail } from '../../redux/auth/authOperations';
import debounce from 'lodash.debounce';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [emailUsername, setEmailUsername] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);

  const [enabled, setEnabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loginResponse;

    if (emailUsername.toString().startsWith('@')) {
      loginResponse = await dispatch(logIn({ password, username: emailUsername }));
    } else {
      loginResponse = await dispatch(logIn({ email: emailUsername, password }));
    }

    console.log(loginResponse.type);

    if (loginResponse && (loginResponse.type.includes('fulfilled'))) {
      setEmailUsername('');
      setPassword('');

      if (emailUsername.toString().startsWith('@')) {
        navigate('/current/user/' + emailUsername);
      } else {
        const userResponse = await dispatch(findByEmail(emailUsername));
        if (userResponse && userResponse.user) {
          navigate('/current/user/' + userResponse.user.username);
        }
      }
    } else {
      setErrorAlert(true);
      debounce(function () { setErrorAlert(false) }, 150);
    }
  };


  const handleChange = ({ target }) => {
    const { value } = target;
    switch (target.name) {
      case 'emailUsername':
        {
          buttonEnabled(value, password);
          return setEmailUsername(value);
        }
      case 'password':
        {
          buttonEnabled(emailUsername, value);
          return setPassword(value);
        }
      default: return;
    }
  }

  const buttonEnabled = (emailUsername, password) => {
    if (emailUsername.length > 0 && password.length > 0) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }

  }


  return (
    <FormContainer>
      <StyledAlert errorAlert={errorAlert}>Error</StyledAlert>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Username or email:</StyledLabel>
        <StyledInput type="text" value={emailUsername} id="emailUsername" name="emailUsername" onChange={e => handleChange(e)} />
        <StyledLabel>Password:</StyledLabel>
        <StyledInput type="password" value={password} id="password" name="password" onChange={(e) => handleChange(e)} />
        <ButtonAndLink>
          <StyledButton type="submit" disabled={!enabled}>Login</StyledButton>
          <NavLink className="nav-element" to="/register">
            Don`t have an account?
          </NavLink>
        </ButtonAndLink>

      </StyledForm>
    </FormContainer>

  )

}

export default LogIn;
