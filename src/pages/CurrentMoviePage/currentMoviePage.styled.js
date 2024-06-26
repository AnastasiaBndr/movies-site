import styled from 'styled-components';

export const MoviePageContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const Description = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const MovieLargeImageItem = styled.img`
  @media screen and (min-width: 768px) {
    height: 600px;
  }
  height: 550px;
  border-radius: 2%;
`;

export const MoviePageNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Timer = styled.div`
  position: absolute;
  top: 30px;
  left: 280px;
  display: flex;
  width: 60px;
  height: 60px;
  font-size: 20px;
  border: 3px solid transparent;
  border-radius: 50%;
  color: coral;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#222, #222) content-box no-repeat,
    conic-gradient(
        coral ${props => props.circlepersentage * 10}%,
        0,
        transparent
      )
      border-box;

  z-index: 1;

  @media screen and (min-width: 768px) {
    top: 20px;
    left: 310px;
    border: 2px solid transparent;
  }
`;

export const MovieImageWrapper = styled.div`
  position: relative;
`;

export const PageContainer = styled.div`
  overflow: hidden;
  padding: 0 30px 0 30px;
`;

export const MovieTitle = styled.a`
  font-size: 50px;
  font-weight: 600;
  display: block;

  margin-bottom: 10px;
`;

export const MovieTagLine = styled.p`
  font-style: italic;
  color: #404040cc;
  &:before {
    color: #ccc;
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }
`;

export const GenresContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`;
export const GenresItem = styled.li`
  margin: 10px;
  &:first-child {
    margin-left: 0;
  }
  border: 1px solid #222;
  border-radius: 10px;
  padding: 8px;
  opacity: 0.5;
  background-color: rgba(34, 34, 34, 0.2);
`;

export const FinishedButton = styled.button`
  color: pink;
  padding: 0;
  font: inherit;
  font-size: 20px;
  cursor: pointer;
  border: none;
  padding: 15px;
  background-color: #222;
  border-radius: 10px;
  transition: color 0.2s ease;
  transition: background-color 0.2s ease;

  width: 100%;
  height: 50px;
  display: block;
  margin-bottom: 10px;
  margin-top: 10px;

  &:hover,
  &:focus {
    color: #222;
    background-color: coral;
  }
`;

export const MovieImageDescrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    align-items: start;
    flex-direction: row;
  }

  @media screen and (min-width: 1440px) {
  }
`;
