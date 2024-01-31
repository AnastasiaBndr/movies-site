import styled from 'styled-components';

export const ButtonStyled = styled.button`
background: none;
  color: pink;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: #222;
  border-radius: 20px;
  padding:${({ $paddingY, $paddingX }) => `${$paddingY}px ${$paddingX}px`};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background-color: ${({ $secondary }) =>
    $secondary ? 'transparent' : 'var(--icon-color)'};
      
    &:disabled {
    color: rgba(239, 237, 232, 0.6);

  transition: color 0.2s ease;
  transition: background-color 0.2s ease;
margin-top: 100px;

&:hover,
    &:focus {
      background-color: ${({ $secondary }) =>
    $secondary ? 'transparent' : 'coral'};
        color:#222;
`;