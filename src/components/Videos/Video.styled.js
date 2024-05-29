import styled from 'styled-components';

export const VideoFrame = styled.iframe`
  width: 100%;
  height: 200px;
  margin-top: 0;
  display: border-box;

  border: 10px solid #222;
  border-radius: 10px;
  border-top-left-radius: 0;

  @media screen and (min-width: 768px) {
    height: 300px;
  }

  @media screen and (min-width: 1440px) {
    height: 500px;
  }
`;

export const NoTrailer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 10px solid #222;
  border-radius: 10px;
  border-top-left-radius: 0;
  background-color: #f0f0f0;
  color: #333;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    height: 300px;
  }

  @media screen and (min-width: 1440px) {
    height: 500px;
  }
`;
