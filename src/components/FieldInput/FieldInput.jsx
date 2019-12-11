import React from 'react';

import {
  Container,
  Input,
  Label,
  ValidationAnsver
} from './FieldInputStyle';

export default ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <Container>
    <Label htmlFor={input.name}>{label}</Label>
    <div>
      <Input {...input} error={touched && error} id={input.name} placeholder={label} type={type} />
      {touched && ((error && <ValidationAnsver>{error}</ValidationAnsver>))}
    </div>
  </Container>
);
