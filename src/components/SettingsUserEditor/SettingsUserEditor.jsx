import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../redux/actions/index';

const mapStateToProps = (state) => {
  const { users: { byId }, uiState: { settingsEdittableUser } } = state;
  const editableUser = byId[settingsEdittableUser];
  return { editableUser };
};

const actionCreators = {
  editUser: actions.editUser
};

class SettingsUserEditor extends React.Component {
  handleEditUser = ({
    firstName,
    secondName,
    patronymic,
    about,
    email,
    sex
  }) => {
    const { editUser, initialValues } = this.props;
    const user = {
      ...initialValues,
      firstName,
      secondName,
      patronymic,
      email,
      sex,
      about
    };
    editUser({ user });
  }

  render() {
    const { handleSubmit, initialValues } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleEditUser)}>
          <h3>{`Edit data of ${initialValues.firstName} ${initialValues.secondName}`}</h3>
          <div>
            <label>First Name</label>
            <div>
              <Field
                name="firstName"
                placeholder="First name"
                required
                component="input"
                type="text"
              />
            </div>
          </div>
          <div>
            <label>First Name</label>
            <div>
              <Field
                name="secondName"
                placeholder="Second name"
                required
                component="input"
                type="text"
              />
            </div>
          </div>
          <div>
            <label>Patronymic</label>
            <div>
              <Field
                name="patronymic"
                placeholder="Patronymic"
                component="input"
                type="text"
              />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <Field
                name="email"
                component="input"
                required
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <label>Sex</label>
            <div>
              <label>
                <Field name="sex" required component="input" type="radio" value="male" />
                {' '}
                Male
              </label>
              <label>
                <Field name="sex" required component="input" type="radio" value="female" />
                {' '}
                Female
              </label>
              <label>
                <Field name="sex" required component="input" type="radio" value="other" />
                {' '}
                Other
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="about">First Name</label>
            <div>
              <Field
                name="about"
                placeholder="About you"
                component="textarea"
              />
            </div>
          </div>
          <input type="submit" value="Edit" />
        </form>
      </div>
    );
  }
}

const ConnectedSettingsUserEditor = connect(mapStateToProps, actionCreators)(SettingsUserEditor);
export default reduxForm({
  form: 'editUser'
})(ConnectedSettingsUserEditor);
