import styled from 'styled-components';

export const MoviesListContainer = styled.div`
  justify-content: center;
  margin-block-start: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px 0 30px;
`;

export const MoviesListTitle = styled.h1`
  display: inline-block;
  margin: 0 auto;
  margin-top: 100px;
`;

export const PageNumber = styled.p`
  margin-block-start: 0;
  color: pink;
  line-height: 40px;
  margin-block-end: 0;
  justify-content: center;
  background-color: #222;
  border-radius: 20px;
  text-align: center;
  width: 50px;
  height: 40px;
  margin: 0 10px 0 10px;
`;

export const GenresList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-inline-start: 0;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: coral;
    height: 5px;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
export const GenresListItem = styled.li`
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
