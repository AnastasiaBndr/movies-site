import styled from 'styled-components';

export const VideoFrame = styled.iframe`

    width:100%-20px;
    height:350px;
    margin-top:0;
    display:border-box;

    border: 10px solid #222;
    border-radius:10px;
    border-top-left-radius:0;


`;

export const WatchTrailerButton = styled.button`
  
  color: ${props => props.buttonactive ? "pink" : "#222"};
  border: none;
  padding: 0;
  font: inherit;
  font-size:20px;
  cursor: pointer;
  outline: inherit;
  padding:15px;
  background-color: ${props => props.buttonactive ? "#222" : "coral"};
  border-radius: 10px;
  border-bottom-left-radius: ${props => props.buttonactive ? "0" : "10px"};
  border-bottom-right-radius: ${props => props.buttonactive ? "0" : "10px"};
  transition: color 0.2s ease;
  transition: background-color 0.2s ease;

  width: 140px;
  height: 50px;
  display: block;

&:hover,
  &:focus {
    color: ${props => props.buttonactive ? "#222" : "pink"};
    background-color: ${props => props.buttonactive ? "coral" : "#222"};
  }

`;
