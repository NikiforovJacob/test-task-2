import React from 'react';

const SettingsUserEditor = (props) => {
  const { activeUserData: {
    firstName,
    secondName,
    patronymic,
    about,
    email,
    gender
  } } = props;

  return (
    <div>
      <div>
        <h2>Active user data</h2>
      </div>
      <div>
        <div>
          {`First name  ${firstName}`}
        </div>
        <div>
          {`Second name  ${secondName}`}
        </div>
        <div>
          {`Patronymic  ${patronymic}`}
        </div>
        <div>
          {`BIO  ${about}`}
        </div>
        <div>
          {`Email  ${email}`}
        </div>
        <div>
          {`Gender  ${gender}`}
        </div>
      </div>
    </div>
  );
};

export default SettingsUserEditor;
