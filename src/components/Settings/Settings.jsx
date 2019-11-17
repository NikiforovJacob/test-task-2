import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions/index';
import SettingsUserActive from '../SettingsUserActive/SettingsUserActive';
import SettingsUserAdder from '../SettingsUserAdder/SettingsUserAdder';
import SettingsUserEditor from '../SettingsUserEditor/SettingsUserEditor';

const mapStateToProps = (state) => {
  const {
    users: {
      byId,
      allIds,
      activeUser
    },
    uiState: {
      settingsUIState,
      settingsEdittableUser
    }
  } = state;
  const users = allIds.map((id) => byId[id]);
  return {
    users,
    activeUserData: byId[activeUser],
    activeUserId: activeUser,
    settingsUIState,
    edittableUserData: byId[settingsEdittableUser]
  };
};

const actionCreators = {
  addUser: actions.addUser,
  removeUser: actions.removeUser,
  onActiveUserSettingsView: actions.onActiveUserSettingsView,
  onAddUserSettingsView: actions.onAddUserSettingsView,
  onEditUserSettingsView: actions.onEditUserSettingsView
};

class NewUserForm extends React.Component {

  handleRemoveUser = (id) => () => {
    const { removeUser } = this.props;
    removeUser({ id });
  }

  handleEditUser = (id) => () => {
    const { onEditUserSettingsView } = this.props;
    onEditUserSettingsView({ id });
  }

  handleOnActiveUserView = () => () => {
    const { onActiveUserSettingsView } = this.props;
    onActiveUserSettingsView();
  }

  handleOnAddUserView = () => () => {
    const { onAddUserSettingsView } = this.props;
    onAddUserSettingsView();
  }

  render() {
    const {
      users,
      activeUserId,
      activeUserData,
      settingsUIState,
      edittableUserData
    } = this.props;

    const removeUserButton = (id) => (
      <button type="button" onClick={this.handleRemoveUser(id)}>
        <span>&times;</span>
      </button>
    );

    const editUserButton = (id) => (
      <button type="button" onClick={this.handleEditUser(id)}>
        <span>edit</span>
      </button>
    );

    const viewSellector = (edittableUserData, activeUserData) => ({
      addUser: <SettingsUserAdder />,
      activeUser: <SettingsUserActive activeUserData={activeUserData} />,
      editUser: <SettingsUserEditor initialValues={edittableUserData} />
    });

    return (
      <div>
        <div>
          <Link to="/dashbord">Back</Link>
        </div>
        <div>
          <div>
            <div>
              <div>
                <button type="button" onClick={this.handleOnActiveUserView()}>
                  <span>Active user data</span>
                </button>
              </div>
              <div>
                <button type="button" onClick={this.handleOnAddUserView()}>
                  <span>Add user</span>
                </button>
              </div>
            </div>
          </div>
          {viewSellector(edittableUserData, activeUserData)[settingsUIState]}
          <div>
            <ul>
              {users.map(({
                id,
                firstName,
                secondName
              }) => (
                <li key={`user-${id}`}>
                  <span>
                    {activeUserId === id ? `${firstName} ${secondName}` : <s>{`${firstName} ${secondName}`}</s>}
                  </span>
                  {editUserButton(id)}
                  {activeUserId === id ? null : removeUserButton(id)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewUserForm);
