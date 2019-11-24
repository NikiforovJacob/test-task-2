import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions/index';
import SettingsUserActive from '../SettingsUserActive/SettingsUserActive';
import SettingsUserAdderEditor from '../SettingsUserEditor/SettingsUserAdderEditor';
import {
  ContainerControls,
  ContainerContent,
  ContainerUsersList,
  ContainerUsersData,
  UsersItem,
  UsersList,
  Header,
  UsersItemButtonsContainer,
  UserItemButton,
  ContentViewControlButtonsContainer
} from './SettingsStyle';

const mapStateToProps = (state) => {
  const {
    users: {
      byId,
      allIds,
      activeUserID
    },
    uiState: {
      settingsUIState,
      settingsEdittableUser
    }
  } = state;
  const users = allIds.map((id) => byId[id]);
  return {
    users,
    activeUserData: byId[activeUserID],
    activeUserID,
    settingsUIState,
    settingsEdittableUser
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


  renderUsersList = (users, activeUserID, settingsEdittableUser) => {
    if (users.length === 0) {
      return 'Users have not added';
    }
    return (
      <UsersList>
        {users.map(({
          id,
          firstName,
          secondName
        }) => (
          <UsersItem isActive={activeUserID === id} key={`user-${id}`}>
            <UsersItemButtonsContainer>
              {this.renderRemoveUserButton(id, activeUserID)}
              {this.renderEditUserButton(id, settingsEdittableUser)}
            </UsersItemButtonsContainer>
            <div>
              {firstName} {secondName}
            </div>
          </UsersItem>
        ))}
      </UsersList>
    );
  }

  renderRemoveUserButton = (id, activeUserID) => (
    <UserItemButton position="left" color="#ff4874" type="button" onClick={this.handleRemoveUser(id, activeUserID)}>
      <span>&times;</span>
    </UserItemButton>
  );

  renderEditUserButton = (id, settingsEdittableUser) => (
    <UserItemButton disabled={settingsEdittableUser === id} position="right" color="#808fb6" type="button" onClick={this.handleEditUser(id)}>
      <span>edit</span>
    </UserItemButton>
  );


  render() {
    const {
      users,
      activeUserID,
      activeUserData,
      settingsUIState,
      settingsEdittableUser
    } = this.props;

    const settingsModeSellector = (activeUserData) => ({
      addUser: <SettingsUserAdderEditor />,
      activeUser: <SettingsUserActive activeUserData={activeUserData} />,
      editUser: <SettingsUserAdderEditor />
    });

    return (
      <div>
        <ContainerControls>
          <Link to="/dashbord">
            <img
              src="src/icons/undo.svg"
              alt="settings icon"
              height="35px"
              width="35px"
            />
          </Link>
        </ContainerControls>
        <ContainerContent>
          <ContainerUsersData>
            <ContentViewControlButtonsContainer>
              <UserItemButton
                color="#808fb6"
                position="left"
                type="button"
                disabled={activeUserID === null || settingsUIState === 'activeUser'}
                onClick={this.handleOnActiveUserView()}
              >
                <span>View active user</span>
              </UserItemButton>
              <UserItemButton
                color="#808fb6"
                position="right"
                type="button"
                disabled={settingsUIState === 'addUser'}
                onClick={this.handleOnAddUserView()}
              >
                <span>Add user</span>
              </UserItemButton>
            </ContentViewControlButtonsContainer>
            {settingsModeSellector(activeUserData)[settingsUIState]}
          </ContainerUsersData>
          <ContainerUsersList>
            <Header>Added users</Header>
            {this.renderUsersList(users, activeUserID, settingsEdittableUser)}
          </ContainerUsersList>
        </ContainerContent>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewUserForm);
