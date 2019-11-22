import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: #ecf1f5;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  @media (min-width: 650px) {
    width: 400px;
    padding: 50px 80px;}
  height: auto;
  margin: 0px 20px;
  padding: 30px 10%;
  background-color: #ffffff;
  box-shadow: 10px 10px 10px #797272;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Button = styled.input`
  font: bold 20px Arial;
  background-color: #ff4874;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  margin: 25px 0px 0px;
`;
