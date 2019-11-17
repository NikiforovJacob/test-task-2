import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const mapStateToProps = (state) => {
  const { authorization: { auth } } = state;
  return { auth };
};

const actionCreators = {
  authorize: actions.authorize
};

class Login extends React.Component {
  handleLogin = () => {
    const { authorize, reset } = this.props;
    // eslint-disable-next-line max-len
    const token = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 16);
    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));
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
            <Field name="accauntName" required component="input" type="text" />
          </div>
          <div className="form-group mx-3">
            <Field name="password" required component="input" type="text" />
          </div>
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

const ConnectedLoginForm = connect(mapStateToProps, actionCreators)(Login);
export default reduxForm({
  form: 'loginForm'
})(ConnectedLoginForm);
