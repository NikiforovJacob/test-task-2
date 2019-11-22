import styled from '@emotion/styled';

export const Container = styled.div`
  height: 105px;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 12px 15px;
  margin: 8px 0px 0px;
  display: inline-block;
  border: 1px solid;
  border-color: ${({ error }) =>
    error ? '#ff4874' : '#ccc'
  };
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Label = styled.label`
  font: bold 20px Arial;
`;

export const ValidationAnsver = styled.div`
  font: 100% Arial;
  color: #ff4874;
  margin-top: 3px;
`;
