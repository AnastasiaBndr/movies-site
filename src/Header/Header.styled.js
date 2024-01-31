import styled from 'styled-components';

export const MainHeader = styled.header`
 width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #222;
  border-bottom: 6px solid coral;
  font-family: 'Dosis', sans-serif;
  font-size: 18px;`;

export const NavBar = styled.ul`
    display: flex;
  justify-content: center;
  margin-top: 35px;`;

export const Button = styled.button`
  background: none;
  color: pink;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover{
    color: aqua;
  }

  &:focus{
    color: aqua;
  }

  transition: color 0.4s ease;`;

export const HeaderItem = styled.li`
list-style-type: none;

&:first-child { 
margin-right: 40px;
}`;