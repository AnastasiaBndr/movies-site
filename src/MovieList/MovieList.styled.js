import styled from 'styled-components';

export const MoviesListContainer = styled.div`

justify-content: center;
`;

export const MoviesListTitle = styled.h1`
  display: inline-block;
  margin: 0 auto;
  margin-top: 100px;
`

export const MoviesList = styled.ul`
 display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  padding-bottom: 20px;
`

export const MoviesItem = styled.li`
  width: 220px;
  list-style-type: none;
  margin: 10px;
`;

export const BackNextButtons = styled.button`
 background: none;
  color: pink;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background-color: #222;
  border-radius: 20px;

  transition: color 0.2s ease;
  transition: background-color 0.2s ease;

    width: 50px;
  height: 40px;
  display: block;

  &:hover,&:focus{
    color: #222;
  background-color: coral;
  }
`;

export const PageNumber = styled.p`
    margin-block-start: 0;
    color:pink;
    line-height: 40px;
    margin-block-end: 0;
    justify-content: center;
  background-color: #222;
   border-radius: 20px;
    text-align: center;
       width: 50px;
  height: 40px;
  margin:0 10px 0 10px;
`;

export const PaginationButtons = styled.div`
display:flex;

  justify-content:center;

`;