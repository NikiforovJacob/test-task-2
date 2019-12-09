import styled from '@emotion/styled';

export const ControlsContainer = styled.div`
  position: fixed;
  top: 0px;
  filter: grayscale(0.75);
  padding: 10px;
  cursor: pointer;
  :hover {filter: grayscale(0);}
`;

export const HeaderDescription = styled.div`
  font: bold 20px arial;
  padding: 30px 0 15px 0;
`;

export const CardDescription = styled.div`
  font: 16px arial;
  padding: 0 0 15px 0;
`;

export const CardDescriptionContainer = styled.div`
  margin: 0 50px 30px 50px;
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: auto minmax(60%,auto);
  grid-template-rows: auto;
  align-items: center;
  grid-template-rows: 500px;
  align-items: start;
  background-color: #ffffff;
`;

export const ContentFirstCulumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
`;

export const ContentBodyTableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat( ${({ numOfColumns }) => numOfColumns}, auto);
  align-items: center;
  overflow: auto;
`;

export const ContentItemText = styled.div`
  font: 16px arial;
  height: 50px;
  display: flex;
  align-self: center;
  ${({ isDark }) => isDark ? 'background-color: #ecf1f5;' : ''};
`;

export const ContentItemBigText = styled.a`
  display: flex;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
  font: 16px arial;
  align-self: center;
  ${({ isDark }) => isDark ? 'background-color: #ecf1f5;' : ''};
  `;

export const ContentItemLink = styled.a`
  font: 16px arial;
  height: 50px;
  display: flex;
  align-self: center;
  ${({ isDark }) => isDark ? 'background-color: #ecf1f5;' : ''};
`;

export const ContentInner = styled.div`
  margin: auto 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContentNamesOfColumns = styled.div`
  height: 60px;
  font: bold 18px arial;
  background-color: #ffffff;
  display: flex;
  align-self: center;
`;

export const ContentNameOfFirstColumn = styled.div`
  height: 60px;
  font: bold 18px arial;
  background-color: #ffffff;
  display: flex;
  align-self: center;
  overflow: hidden;
`;
