import styled from 'styled-components';

export const MainHeader = styled.header`
  background-color: #222;
  box-sizing: border-box;
  padding: 0 30px 0 30px;
  height: 100px;
  border-top: 3px solid coral;
  border-bottom: 3px solid coral;
  font-family: 'Dosis', sans-serif;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  margin-block-start: 140px;
  width: 100%;
  z-index: 100;

  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const NavBar = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
`;

export const Button = styled.button`
  background: none;
  color: pink;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    color: aqua;
  }

  &:focus {
    color: aqua;
  }

  transition: color 0.4s ease;
`;

export const Hero = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  &:before {
    content: '';
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  img {
    max-height: 150px;
    width: 100%;
    object-fit: cover;
    object-position: 0 20%;
    margin-block-end: 0;
  }
`;

export const HeroTitle = styled.h3`
  color: white;
  font-size: 30px;
  margin: 0;
`;

export const WatchNow = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export const PlayIcon = styled.svg`
  display: block;
  cursor: pointer;
  width: 40px;
  height: 40px;

  use {
    fill: coral;
  }
`;

export const HeroDescriptionContainer = styled.div`
  position: absolute;
  width: 80%;
  top: 50%;
  transform: translateY(-70%);
  left: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GoBackButton = styled.button`
  display: block;
  border: 1px solid coral;
  z-index: 999;
  background: none;
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
