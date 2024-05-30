import styled from 'styled-components';

export const CastList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0;
  overflow-y: hidden;
  padding-bottom: 20px;
  width: 100%;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: coral;
    height: 5px;
  }
`;

export const CastItem = styled.li`
  width: 220px;
  list-style-type: none;
  margin: 10px;
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

  color: white;
`;
