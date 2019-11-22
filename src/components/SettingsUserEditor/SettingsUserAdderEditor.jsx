import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../redux/actions/index';
import { selectCardsIDs } from '../../Data/data';
import FieldInput from '../FieldInput/FieldInput';

const mapStateToProps = (state) => {
  const { users: { byId, allIds }, uiState: { settingsUIState, settingsEdittableUser } } = state;
  if (settingsUIState === 'editUser') {
    const editableUser = byId[settingsEdittableUser];
    return { initialValues: editableUser, editableUser, settingsUIState };
  }
  return { allIds, settingsUIState };
};

const actionCreators = {
  editUser: actions.editUser,
  addUser: actions.addUser
};

const validate = (values) => {
  const errors = {};
  const nameValidate = (fieldName) => {
    if (!values[fieldName]) {
      errors[fieldName] = 'Required';
    } else if (values[fieldName].length > 20) {
      errors[fieldName] = 'Must be 20 characters or less';
    } else if (!/^(?! )(?!.* $)(?!(?:.* )).*$/i.test(values[fieldName])) {
      errors[fieldName] = 'Must have not spaces';
    }
  };
  nameValidate('firstName');
  nameValidate('secondName');
  nameValidate('patronymic');
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

class SettingsUserAdderEditor extends React.Component {
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

  handleAddUser = ({
    firstName,
    secondName,
    patronymic,
    about,
    email,
    sex
  }) => {
    console.log(selectCardsIDs(3));
    const { addUser, allIds, reset} = this.props;
    const user = {
      id: allIds.length === 0 ? 1 : (allIds[0] + 1),
      firstName,
      secondName,
      patronymic,
      email,
      sex,
      about,
      userCardsIDs: selectCardsIDs(3)
    };
    addUser({ user });
    reset();
  }

  render() {
    const { handleSubmit, editableUser, settingsUIState } = this.props;

    const headerOfEditor = (editableUser) => (
      <h3>{`Edit data of ${editableUser.firstName} ${editableUser.secondName}`}</h3>
    );
    const headerOfAdder = <h3>Add new user</h3>;

    return (
      <div>
        <form onSubmit={handleSubmit(settingsUIState === 'addUser' ? this.handleAddUser : this.handleEditUser)}>
          {settingsUIState === 'addUser' ? headerOfAdder : headerOfEditor(editableUser)}
          <div>
            <div>
              <Field
                name="firstName"
                label="First name"
                component={FieldInput}
                type="text"
              />
            </div>
          </div>
          <div>
            <div>
              <Field
                name="secondName"
                label="Second name"
                component={FieldInput}
                type="text"
              />
            </div>
          </div>
          <div>
            <div>
              <Field
                name="patronymic"
                label="Patronymic"
                component={FieldInput}
                type="text"
              />
            </div>
          </div>
          <div>
            <div>
              <Field
                name="email"
                component={FieldInput}
                type="email"
                label="Email"
              />
            </div>
          </div>
          <div>
            <label>Gender</label>
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
          <input type="submit" value={settingsUIState === 'addUser' ? 'Add' : 'Edit'} />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(
  reduxForm({
    form: 'add/editUser',
    validate,
    enableReinitialize: true
  })(SettingsUserAdderEditor)
);
