import styled from '@emotion/styled';
import { Field } from 'redux-form';

export const Header = styled.div`
  font: bold 30px arial;
  margin-bottom: 40px;
  margin-top: 45px;
  text-align: center;
`;

export const InputTextArea = styled(Field)`
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  resize: none;
  font: 16px Arial;
`;

export const InputLabelContainer = styled.div`
  font: bold 20px Arial;
  margin: 0px 0px 8px 0px;
`;

export const InputContainer = styled.div`
  margin: 0px 0px 25px 0px;
`;

export const Button = styled.input`
  font: bold 14px Arial;
  background-color: #ff4874;
  cursor: auto;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border: none;
  border-radius: 4px;
`;

export const InputRadioLabelContainer = styled.label`
  font: 16px Arial;
`;
