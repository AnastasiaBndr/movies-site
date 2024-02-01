import styled from 'styled-components';

export const MoviePageContainer = styled.div`
margin-top: 40px;
  display: flex;
`;

export const Description = styled.div` margin-left: 40px;
`;
 
export const MovieLargeImageItem = styled.img`
height: 600px;`;

export const MoviePageNavigation = styled.nav`display: flex;
  justify-content: space-between;
  width: 100%;`;


export const GoBackButton = styled.button` display: block;
   background: none;
  color: pink;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: #222;
  border-radius: 20px;
  padding:15px;

  transition: color 0.2s ease;
  transition: background-color 0.2s ease;
margin-top: 100px;

&:hover, &:focus{
  color: #222;
  background-color: coral;
}`;

export const Timer = styled.div`
    position:absolute;
    width:50px;
    height:50px; 
    border:0.5vh  solid #222;
    border-radius:50%;


    z-index:1;
`;

export const PageContainer = styled.div`
overflow:hidden;`;