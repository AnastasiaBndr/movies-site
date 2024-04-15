import styled from 'styled-components';

export const MoviePageContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

export const Description = styled.div`
  margin-left: 40px;
`;

export const MovieLargeImageItem = styled.img`
  height: 600px;
  border-radius: 2%;
`;

export const MoviePageNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Timer = styled.div`
  position: absolute;
  top: 20px;
  left: 81%;
  display: flex;
  width: 60px;
  height: 60px;
  font-size: 20px;
  border: 0.3vh solid transparent;
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

  margin-bottom: 40px;
`;

export const GenresContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
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
