import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions/index';
import SettingsUserActive from '../SettingsUserActive/SettingsUserActive';
import SettingsUserAdderEditor from '../SettingsUserEditor/SettingsUserAdderEditor';

const mapStateToProps = (state) => {
  const {
    users: {
      byId,
      allIds,
      activeUserID
    },
    uiState: {
      settingsUIState
    }
  } = state;
  const users = allIds.map((id) => byId[id]);
  return {
    users,
    activeUserData: byId[activeUserID],
    activeUserID,
    settingsUIState
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

  handleRemoveUser = (id, activeUserID) => () => {
    const { removeUser } = this.props;
    const isActive = id === activeUserID;
    removeUser({ id, isActive });
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
      activeUserID,
      activeUserData,
      settingsUIState
    } = this.props;

    const removeUserButton = (id) => (
      <button type="button" onClick={this.handleRemoveUser(id, activeUserID)}>
        <span>&times;</span>
      </button>
    );

    const editUserButton = (id) => (
      <button type="button" onClick={this.handleEditUser(id)}>
        <span>edit</span>
      </button>
    );
    const settingsModeSellector = (activeUserData) => ({
      addUser: <SettingsUserAdderEditor />,
      activeUser: <SettingsUserActive activeUserData={activeUserData} />,
      editUser: <SettingsUserAdderEditor />
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
                <button type="button" disabled={activeUserID === null} onClick={this.handleOnActiveUserView()}>
                  <span>View active user</span>
                </button>
              </div>
              <div>
                <button type="button" onClick={this.handleOnAddUserView()}>
                  <span>Add user</span>
                </button>
              </div>
            </div>
          </div>
          {settingsModeSellector(activeUserData)[settingsUIState]}
          <div>
            <ul>
              {users.map(({
                id,
                firstName,
                secondName
              }) => (
                <li key={`user-${id}`}>
                  <span>
                    {activeUserID === id ? `${firstName} ${secondName}` : <s>{`${firstName} ${secondName}`}</s>}
                  </span>
                  {editUserButton(id)}
                  {removeUserButton(id)}
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
