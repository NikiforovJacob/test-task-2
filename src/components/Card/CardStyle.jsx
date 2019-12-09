import styled from '@emotion/styled';

export const Container = styled.div`
  height: 250px;
  width: 250px;
  margin: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 20px #797272;
  }
`;

export const CardIcon = styled.div`
  height: 65px;
  width: 65px;
  margin: 15% 10%;
`;

export const CardName = styled.div`
  font: bold 25px arial;
  padding-bottom: 16px;
  color: #2b3245;
`;

export const CardDescription = styled.div`
  font-family: arial;
  margin: 5px 10px;
  color: #afb9bf;
  text-align: center;
`;
