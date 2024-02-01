import styled from 'styled-components';

export const VideoList = styled.ul`
    list-style-type:none;

    height:200px;
    overflow:auto;

    display:flex;
    flex-wrap:wrap;
`;

export const VideoFrame = styled.iframe`
    width:200px;
    display:block;
    margin:5px;
`;