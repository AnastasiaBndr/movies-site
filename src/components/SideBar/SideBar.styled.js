import styled from 'styled-components';

export const MainPart = styled.div`
  background-color: #222;
  box-sizing: border-box;
  padding: 40px 40px 40px 40px;
  font-family: 'Dosis', sans-serif;
  font-size: 18px;
  position: sticky;

  text-align: center;

  color: pink;
  min-width: 300px;
  height: 1000px;
  top: 100px;
  z-index: 80;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const TopPart = styled.div`
  text-align: center;
  border-bottom: 1px solid coral;
`;

export const ProfilePicContainer = styled.div`
  position: relative;
`;
export const UserAvatar = styled.svg`
  width: 40px;
  height: 40px;
  border: 1px solid var(--accent-color);
  border-radius: 50%;

  background-color: #393939;
  padding: 20px;

  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;

    padding: 24px;
  }

  @media screen and (min-width: 1440px) {
    width: 50px;
    height: 50px;

    padding: 14px;
  }
`;

export const BottomPart = styled.div`
  text-align: center;

  &:last-child {
    margin-block-end: 20px;
  }
`;

export const NavBar = styled.div`
  display: flex;

  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid coral;

  &:last-child {
    margin-bottom: 20px;
  }
`;
