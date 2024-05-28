import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 0 20px 0;

  @media screen and (min-width: 768px) {
    padding: 72px 0 38px 0;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 0 0 49px;
    margin-block-start: 143px;
  }
`;

export const UserInfo = styled.div`
  text-align: center;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    max-width: 439px;
    margin: 0 auto;
    margin-top: 64px;
  }

  @media screen and (min-width: 1440px) {
    max-width: 439px;
    margin: 0 auto;
  }
`;

export const UserAvatar = styled.svg`
  width: 90px;
  height: 90px;
  border: 1px solid var(--accent-color);
  border-radius: 50%;

  background-color: #393939;
  padding: 20px;

  @media screen and (min-width: 768px) {
    width: 150px;
    height: 150px;

    padding: 24px;
  }

  @media screen and (min-width: 1440px) {
    width: 150px;
    height: 150px;

    padding: 24px;
  }
`;

export const AvatarContainer = styled.div`
  display: inline-block;
  width: 90px;
  height: 90px;
  img {
    border-radius: 50%;
    border: 1px solid var(--icon-color);
  }

  @media screen and (min-width: 768px) {
    width: 150px;
    height: 150px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px solid var(--icon-color);
    }
  }
`;

export const UserName = styled.p`
  margin-block-start: 31px;
  margin-block-end: 4px;
  font-weight: 400;
  font-size: 18px;

  @media screen and (min-width: 768px) {
    margin-block-start: 32px;
  }

  @media screen and (min-width: 1440px) {
    font-size: 24px;
  }
`;

export const UserRole = styled.p`
  margin-block-start: 0;
  opacity: 0.5;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    margin-block-start: 8px;
    margin-block-end: 32px;
  }
`;

export const LogOutBtnWraper = styled.div`
  display: flex;
  justify-content: end;
`;

export const LogOutButton = styled.button`
  background: none;
  /* color: var(--main-text-color); */
  border: none;
  padding: 0;
  font-size: 14px;
  line-height: 1.3;
  cursor: pointer;
  outline: inherit;
  display: flex;
  align-items: center;
  margin-left: auto;

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

export const SvgLogoutIcon = styled.svg`
  margin-left: 8px;
  stroke: var(--accent-color);
`;

export const ProfilePicContainer = styled.div`
  position: relative;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-inline-start: 0;
`;
export const ListItem = styled.li`
  display: block;
  background: none;
  color: pink;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: #222;
  border-radius: 20px;
  padding: 15px;

  transition: color 0.2s ease;
  transition: background-color 0.2s ease;
  margin-top: 20px;

  &:hover,
  &:focus {
    color: #222;
    background-color: coral;
  }
  list-style-type: none;
  margin: 5px;
`;
