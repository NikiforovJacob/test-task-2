import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import FieldInput from '../FieldInput/FieldInput';

import { Container, Form, Button } from './LoginStyle';

const actionCreators = {
  authorize: actions.authorize
};

const validate = (values) => {
  const errors = {};
  if (!values.accountName) {
    errors.accountName = 'Required';
  } else if (values.accountName.length > 20) {
    errors.accountName = 'Must be 20 characters or less';
  } else if (!/^(?! )(?!.* $)(?!(?:.* )).*$/i.test(values.accountName)) {
    errors.accountName = 'Must have not spaces';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};


const Login = (props) => {
  const handleLogin = () => {
    const { authorize, reset } = props;
    const token = (
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    ).slice(0, 16);
    localStorage.setItem('token', token);
    authorize({ isAuthorized: true });
    reset();
  };

  const { handleSubmit, authorize } = props;
  if (localStorage.getItem('token') !== null) {
    authorize({ isAuthorized: true });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Field name="accountName" component={FieldInput} label="Account name" type="text" />
        <Field name="password" required component={FieldInput} label="Password" type="password" />
        <Button type="submit" value="Log in" />
      </Form>
    </Container>
  );
};


const ConnectedLoginForm = connect(() => ({}), actionCreators)(Login);
export default reduxForm({
  form: 'loginForm',
  validate
})(ConnectedLoginForm);
