import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-block-start: 40px;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 768px) {
  }
`;

export const StyledForm = styled.form`
  font-size: 18px;
  width: 80%;
  box-sizing: border-box;
  background-color: #222;
  padding: 20px;
  border-radius: 5px;

  @media screen and (min-width: 768px) {
    width: 400px;
  }
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: ${props => (props.invalid ? 'red' : 'pink')};
`;

export const ButtonAndLink = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const StyledButton = styled.button`
  padding: 10px;
  color: #222;
  background-color: coral;
  margin-top: 10px;
  border: none;
  border-radius: 5px;

  margin-bottom: 10px;
  border: 1px solid #222;
  &:disabled {
    opacity: 0.5;
    font-weight: bold;
  }
  &:enabled {
    opacity: 1;
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: #222;
      color: pink;
      border: 1px solid coral;
    }

    transition: color 0.2s ease;
    transition: background-color 0.2s ease;
    transition: border 0.2s ease;
  }
  opacity: ${props => (!props.enabled ? 0.5 : 1)};
`;

export const StyledAlert = styled.div`
  position: absolute;
  padding: 20px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;

  opacity: ${props => (props.errorAlert ? 1 : 0)};
`;
