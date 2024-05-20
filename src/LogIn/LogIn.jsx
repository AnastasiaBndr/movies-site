import { StyledForm, StyledInput, StyledButton, StyledLabel, FormContainer, ButtonAndLink } from './LogIn.styled';
import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';

const LogIn = () => {
  // const [username, setUsername] = useState('');
  // const dispatch = useDispatch();
  // const [password, setPassword] = useState('');

  // const [enabled, setEnabled] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }

  // const usernameEntered = (e) => {

  // }

  // const passwordEntered = (e) => {

  // }

  // const buttonEnabled = (username, password) => {

  // }

  // return (
  //   <FormContainer>
  //     <StyledForm onSubmit={handleSubmit}>
  //       <StyledLabel>Username:</StyledLabel>
  //       <StyledInput type="text" value={username} onChange={e => usernameEntered(e)} />
  //       <StyledLabel>Password:</StyledLabel>
  //       <StyledInput type="password" value={password} onChange={(e) => passwordEntered(e)} />
  //       <ButtonAndLink>
  //         <StyledButton type="submit" disabled={!username || !password}>Login</StyledButton>
  //         <NavLink className="nav-element" to="/register">
  //           Don`t have an account?
  //         </NavLink>
  //       </ButtonAndLink>

  //     </StyledForm>
  //   </FormContainer>

  // )

  return (
    <FormContainer>
      <StyledForm >
        <StyledLabel>Username:</StyledLabel>
        <StyledInput type="text" />
        <StyledLabel>Password:</StyledLabel>
        <StyledInput type="password" />
        <ButtonAndLink>
          <StyledButton type="submit" disabled="true">Login</StyledButton>
          <NavLink className="nav-element" to="/register">
            Don`t have an account?
          </NavLink>
        </ButtonAndLink>

      </StyledForm>
    </FormContainer>

  )

}

export default LogIn;
