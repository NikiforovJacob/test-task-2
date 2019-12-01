import styled from '@emotion/styled';

export const ControlsContainer = styled.div`
  position: fixed;
  top: 0px;
  filter: grayscale(0.75);
  padding: 10px;
  cursor: pointer;
  :hover {filter: grayscale(0);}
`;

export const Header = styled.div`
  font: bold 20px arial;
  padding: 30px 0 15px 0;
`;

export const CardDescription = styled.div`
  font: 16px arial;
  padding: 0 0 15px 0;
`;

export const CardDescriptionContainer = styled.div`
  margin: 0 50px 0 50px;
`;

export const ContentContainer = styled.div`
  display: grid;
  // grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: repeat( ${({ numOfColumns }) => numOfColumns}, 1fr);
  // justify-content: center;
  // justify-items: center;
  align-items: center;
`;

export const ContentItemText = styled.div`
  padding: 10px 20px;
  font: 16px arial;
`;

export const ContentItemBigText = styled.a`
  padding: 10px 20px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font: 16px arial;
`;

export const ContentItemLink = styled.a`
  padding: 10px 20px;
  font: 16px arial;
`;

export const ContentNamesOfColumns = styled.div`
  padding: 10px 20px;
  font: bold 18px arial;
  background-color: #ffffff;
`;
