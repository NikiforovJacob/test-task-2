import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions/index';
import SettingsUserActive from '../SettingsUserActive/SettingsUserActive';
import SettingsUserAdderEditor from '../SettingsUserEditor/SettingsUserAdderEditor';
import {
  usersSelector,
  activeUserIDSelector,
  settingsUIStateSelector,
  settingsEdittableUserSelector,
  activeUserSelector
} from '../../redux/selectors';

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

import iconUndo from '../../icons/undo.svg';

const mapStateToProps = (state) => ({
  users: usersSelector(state),
  activeUserData: activeUserSelector(state),
  activeUserID: activeUserIDSelector(state),
  settingsUIState: settingsUIStateSelector(state),
  settingsEdittableUser: settingsEdittableUserSelector(state)
});

const actionCreators = {
  addUser: actions.addUser,
  removeUser: actions.removeUser,
  onActiveUserSettingsView: actions.onActiveUserSettingsView,
  onAddUserSettingsView: actions.onAddUserSettingsView,
  onEditUserSettingsView: actions.onEditUserSettingsView
};

const NewUserForm = (props) => {
  const handleRemoveUser = (id, activeUserID) => () => {
    const { removeUser } = props;
    const isActive = id === activeUserID;
    removeUser({ id, isActive });
  };

  const handleEditUser = (id) => () => {
    const { onEditUserSettingsView } = props;
    onEditUserSettingsView({ id });
  };

  const handleOnActiveUserView = () => () => {
    const { onActiveUserSettingsView } = props;
    onActiveUserSettingsView();
  };

  const handleOnAddUserView = () => () => {
    const { onAddUserSettingsView } = props;
    onAddUserSettingsView();
  };


  const renderRemoveUserButton = (id, activeUserID) => (
    <UserItemButton position="left" color="#ff4874" type="button" onClick={handleRemoveUser(id, activeUserID)}>
      <span>&times;</span>
    </UserItemButton>
  );

  const renderEditUserButton = (id, settingsEdittableUser) => (
    <UserItemButton disabled={settingsEdittableUser === id} position="right" color="#808fb6" type="button" onClick={handleEditUser(id)}>
      <span>edit</span>
    </UserItemButton>
  );

  const renderUsersList = (users, activeUserID, settingsEdittableUser) => {
    if (users.length === 0) {
      return (<UsersList><UsersItem>No added users</UsersItem></UsersList>);
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
              {renderRemoveUserButton(id, activeUserID)}
              {renderEditUserButton(id, settingsEdittableUser)}
            </UsersItemButtonsContainer>
            <div>
              {`${firstName} ${secondName}`}
            </div>
          </UsersItem>
        ))}
      </UsersList>
    );
  };

  const {
    users,
    activeUserID,
    activeUserData,
    settingsUIState,
    settingsEdittableUser
  } = props;

  const settingsModeSellector = (userData) => ({
    addUser: <SettingsUserAdderEditor />,
    activeUser: <SettingsUserActive activeUserData={userData} />,
    editUser: <SettingsUserAdderEditor />
  });

  return (
    <div>
      <ContainerControls>
        <Link to="/dashbord">
          <img
            src={iconUndo}
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
              onClick={handleOnActiveUserView()}
            >
              <span>View active user</span>
            </UserItemButton>
            <UserItemButton
              color="#808fb6"
              position="right"
              type="button"
              disabled={settingsUIState === 'addUser'}
              onClick={handleOnAddUserView()}
            >
              <span>Add user</span>
            </UserItemButton>
          </ContentViewControlButtonsContainer>
          {settingsModeSellector(activeUserData)[settingsUIState]}
        </ContainerUsersData>
        <ContainerUsersList>
          <Header>Added users</Header>
          {renderUsersList(users, activeUserID, settingsEdittableUser)}
        </ContainerUsersList>
      </ContainerContent>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(NewUserForm);
