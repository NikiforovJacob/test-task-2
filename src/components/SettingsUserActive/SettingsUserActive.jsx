import React from 'react';
import {
  Header,
  DataTitle,
  Data,
  UserDataContainer
} from './SettingsUserActiveStyle';

const SettingsUserEditor = (props) => {
  const {
    activeUserData: {
      firstName,
      secondName,
      patronymic,
      about,
      email,
      gender
    }
  } = props;

  return (
    <div>
      <div>
        <Header>Active user data</Header>
      </div>
      <div>
        <UserDataContainer>
          <DataTitle>First name:</DataTitle>
          <Data>{firstName}</Data>
        </UserDataContainer>
        <UserDataContainer>
          <DataTitle>Second name:</DataTitle>
          <Data>{secondName}</Data>
        </UserDataContainer>
        <UserDataContainer>
          <DataTitle>Patronymic:</DataTitle>
          <Data>{patronymic}</Data>
        </UserDataContainer>
        <UserDataContainer>
          <DataTitle>BIO:</DataTitle>
          <Data>{about}</Data>
        </UserDataContainer>
        <UserDataContainer>
          <DataTitle>Email:</DataTitle>
          <Data>{email}</Data>
        </UserDataContainer>
        <UserDataContainer>
          <DataTitle>Gender:</DataTitle>
          <Data>{gender}</Data>
        </UserDataContainer>
      </div>
    </div>
  );
};

export default SettingsUserEditor;
