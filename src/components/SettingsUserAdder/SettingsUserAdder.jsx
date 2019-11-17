import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../redux/actions/index';
import getCardsDescriptions from '../../Data/data';

const mapStateToProps = (state) => {
  const { users: { allIds } } = state;
  return { allIds };
};

const actionCreators = {
  addUser: actions.addUser
};

class SettingsUserAdder extends React.Component {
  handleAddUser = ({
    firstName,
    secondName,
    patronymic,
    about,
    email,
    sex
  }) => {
    const { addUser, allIds, reset} = this.props;
    const user = {
      id: allIds.length === 0 ? 1 : (allIds[0] + 1),
      firstName,
      secondName,
      patronymic,
      email,
      sex,
      about,
      userCards: getCardsDescriptions(3)
    };
    addUser({ user });
    reset();
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleAddUser)}>
          <h3>Add new user</h3>
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
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

const ConnectedSettingsUserAdder = connect(mapStateToProps, actionCreators)(SettingsUserAdder);
export default reduxForm({
  form: 'newUser'
})(ConnectedSettingsUserAdder);
