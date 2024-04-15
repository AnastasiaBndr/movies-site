import styled from 'styled-components';

export const VideoFrame = styled.iframe`
    width:90%;
    height:400px;
    display:block;
    margin-top:0;

    border: 10px solid #222;
    border-radius:10px;
    border-top-left-radius:0;

`;

export const WatchTrailerButton = styled.button`
  
  color: ${props => props.buttonative ? "pink" : "#222"};
  border: none;
  padding: 0;
  font: inherit;
  font-size:20px;
  cursor: pointer;
  outline: inherit;
  padding:15px;
  background-color: ${props => props.buttonative ? "#222" : "coral"};
  border-radius: 10px;
border-bottom-left-radius: ${props => props.buttonative ? "0" : "10px"};
  border-bottom-right-radius: ${props => props.buttonative ? "0" : "10px"};
  transition: color 0.2s ease;
  transition: background-color 0.2s ease;

  width: 140px;
  height: 50px;
  display: block;

  

  
&:hover,
  &:focus {
    color: ${props => props.buttonative ? "#222" : "pink"};
    background-color: ${props => props.buttonative ? "coral" : "#222"};
  }

`;
