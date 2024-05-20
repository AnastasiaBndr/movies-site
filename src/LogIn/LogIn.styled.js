import styled from 'styled-components';

export const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledForm = styled.form`
  font-size: 18px;
  width: 400px;
  box-sizing: border-box;
  background-color: #222;
  padding: 20px;
  border-radius: 5px;
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
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const StyledButton = styled.button`
  background-color: #coral;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1;
  }
  opacity: ${props => (!props.enabled ? 0.5 : 1)};
  color: ${props => (!props.enabled ? 'white' : '#222')};
`;

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`;
