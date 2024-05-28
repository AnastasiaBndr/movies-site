import styled from 'styled-components';

export const StyledLogOutBtn = styled.button`
  display: block;
  border: 1px solid coral;
  z-index: 999;
  background: #222;
  color: pink;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  border-radius: 20px;
  padding: 15px;

  transition: color 0.2s ease;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    color: #222;
    background-color: coral;
  }
`;
