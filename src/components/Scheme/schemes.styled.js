import styled from 'styled-components';

export const MoviesItem = styled.li`
  width: 220px;
  list-style-type: none;
  margin: 10px;
  position: relative;
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
  margin: 2px;

  transition: color 0.2s ease;
  transition: background-color 0.2s ease;

  width: ${props => (props.$primary ? '30px' : '50px')};
  height: ${props => (props.$primary ? '30px' : '40px')};
  display: block;
  margin-top: ${props => (props.$primary ? '5px' : '0')};

  &:hover,
  &:focus {
    color: #222;
    background-color: coral;
  }
`;

export const PaginationButtons = styled.div`
  display: flex;

  justify-content: center;
`;

export const MoviesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  display: inline-block;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  line-height: 1.5em;
  background-color: #222;
  padding: 5px;
  text-align: center;
  border-radius: 10%;
  h3 {
    margin: 0;
    color: white;
    font-weight: 400;
    max-width: 200px;
  }
  img {
    border-radius: 10%;
    margin: 0;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
`;
