import styled from 'styled-components';

export const StyledLogOutBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (min-width: 1440px) {
    &:hover,
    &:focus {
      & > span {
        color: var(--accent-color);
      }
    }
  }
`;

export const StyledLogOutBtnText = styled.span`
  color: coral
  font-size: 14px;
  line-height: 128.571%;

  transition: var(--transition);

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 150%;
  }
`;

export const StyledLogOutBtnIcon = styled.svg`
  width: 20px;
  height: 20px;

  stroke: coral;
`;
