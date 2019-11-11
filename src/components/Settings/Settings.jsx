import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../redux/actions/index';

const mapStateToProps = (state) => {
  const { users: { byId, allIds } } = state;
  const users = allIds.map((id) => byId[id]);
  return { users };
};

const actionCreators = {
  addUser: actions.addUser,
  removeUser: actions.removeUser
};

class NewUserForm extends React.Component {
  handleAddUser = ({ firstName, secondName }) => {
    const { addUser, users, reset } = this.props;
    const user = {
      id: users.length === 0 ? 1 : (users[0].id + 1),
      firstName,
      secondName
    };
    addUser({ user });
    reset();
  }

  handleRemoveUser = (id) => () => {
    const { removeUser } = this.props;
    removeUser({ id });
  }

  render() {
    const { handleSubmit, users } = this.props;

    const removeUserButton = (id) => (
      <button type="button" onClick={this.handleRemoveUser(id)}>
        <span>&times;</span>
      </button>
    );

    return (
      <div>
        <div>
          <Link to="/dashbord">Back</Link>
        </div>
        <form className="form-inline" onSubmit={handleSubmit(this.handleAddUser)}>
          <div className="form-group mx-3">
            <Field name="firstName" required component="input" type="text" />
          </div>
          <div className="form-group mx-3">
            <Field name="secondName" required component="input" type="text" />
          </div>
          <input type="submit" value="Add" />
        </form>
        <ul>
          {users.map(({
            id,
            firstName,
            secondName,
            activateUser
          }) => (
            <li key={`user-${id}`}>
              <span>
                {`${firstName} ${secondName}`}
              </span>
              {activateUser === id ? null : removeUserButton(id)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const ConnectedNewUserForm = connect(mapStateToProps, actionCreators)(NewUserForm);
export default reduxForm({
  form: 'newUser'
})(ConnectedNewUserForm);
