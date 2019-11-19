import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import FieldInput from '../FieldInput/FieldInput';

const mapStateToProps = (state) => {
  const { authorization: { auth } } = state;
  return { auth };
};

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
  return errors;
};

class Login extends React.Component {
  handleLogin = () => {
    const { authorize, reset } = this.props;
    // eslint-disable-next-line max-len
    const token = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 16);
    localStorage.setItem('token', token);
    authorize({ isAuthorized: true });
    reset();
  }

  render() {
    const { handleSubmit, authorize } = this.props;
    if (localStorage.getItem('token') !== null) {
      authorize({ isAuthorized: true });
    }

    return (
      <div>
        <form className="form-inline" onSubmit={handleSubmit(this.handleLogin)}>
          <div className="form-group mx-3">
            <Field name="accountName" component={FieldInput} label="Account name" type="text" />
          </div>
          <div className="form-group mx-3">
            <Field name="password" required component={FieldInput} label="Password" type="password" />
          </div>
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

const ConnectedLoginForm = connect(mapStateToProps, actionCreators)(Login);
export default reduxForm({
  form: 'loginForm',
  validate
})(ConnectedLoginForm);
