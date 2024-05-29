import styled from 'styled-components';

export const ReviewsContainer = styled.div``;

export const ReviewItem = styled.li`
  margin-block-start: 20px;

  box-sizing: border-box;
  padding: 20px;
  border-radius: 20px;
  background-color: #d8e1e8;
  list-style-type: none;
  list-style-position: inside;
`;

export const ReviewAuthor = styled.p`
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 8px;
`;

export const ReviewAuthorUsername = styled.p`
  margin-top: 0;
  font-size: 14px;
  margin-left: 20px;
  color: #708493;
`;

export const ReviewCreatedAt = styled.p`
  margin-left: 80%;
  margin-bottom: 0;
  color: #708493;
`;

export const Review = styled.p`
  background-color: #e7ecf2;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 20px;
  letter-spacing: 0.02em;
  line-height: 1.4;
`;
