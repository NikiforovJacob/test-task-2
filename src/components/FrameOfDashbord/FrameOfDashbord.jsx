import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import * as actions from '../../redux/actions/index';

import {
  Frame,
  Header,
  UsersList,
  Container,
  Footer,
  SettingsIconBox,
  UserIconBox,
  UserSelector,
  UserSelectorName,
  LinkChangeColor,
  HeaderSubstitute
} from './FrameOfDashbordStyle';

import iconNoActiveUser from '../../icons/info.svg';
import iconSettings from '../../icons/settings-4.svg';
import iconUserMale from '../../icons/user_male.svg';
import iconUserFemale from '../../icons/user_female.svg';
import iconUserOther from '../../icons/user_other.svg';

const mapStateToProps = (state) => {
  const { users: { byId, allIds, activeUserID }, uiState: { isActiveUserSelectorsShown } } = state;
  const users = allIds.map((id) => byId[id]);
  const activeUser = (activeUserID === null) ? null : byId[activeUserID];
  return {
    users,
    activeUser,
    activeUserID,
    isActiveUserSelectorsShown
  };
};

const actionCreators = {
  activateUser: actions.activateUser,
  hideActiveUserSelectors: actions.hideActiveUserSelectors,
  toggleShownActiveUserSelectors: actions.toggleShownActiveUserSelectors
};


const userIconMatch = {
  male: iconUserMale,
  female: iconUserFemale,
  other: iconUserOther
};

const LinkStyled = styled(Link)`
  display: inline-block;
  text-decoration: none;
  height: 45px;
`;


class FrameOfDashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: window.innerHeight };
  }

  componentDidMount() {
    // this.setState({ height: window.innerHeight })
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ height: window.innerHeight });
  }

  handleToggleUsersList = () => {
    const { toggleShownActiveUserSelectors } = this.props;
    toggleShownActiveUserSelectors();
  };

  handleHideUlersList = () => {
    const { hideActiveUserSelectors } = this.props;
    hideActiveUserSelectors();
  };

  handleActivateUser = (id) => () => {
    const { activateUser } = this.props;
    activateUser({ id });
  };

  renderUsersSelectors = (users, activeUserID) => (
    <UsersList>
      {users.length === 0 ? (
        <LinkStyled to="/settings">
          <UserSelector>
            Users have not created. Go to the settings.
          </UserSelector>
        </LinkStyled>
      ) : (
        users.map(({
          id,
          firstName,
          secondName,
          gender
        }) => (
          <UserSelector
            onClick={this.handleActivateUser(id)}
            isActiveUser={activeUserID === id}
            key={`user-${id}`}
          >
            <UserSelectorName>{`${firstName} ${secondName}`}</UserSelectorName>
            <div>
              <img
                src={userIconMatch[gender]}
                alt="user icon"
                height="35px"
                width="35px"
              />
            </div>
          </UserSelector>
        ))
      )}
    </UsersList>
  )

  renderUserIcon = (activeUser, users) => (
    <UserIconBox
      onClick={this.handleToggleUsersList}
      usersLength={users.length}
    >
      {activeUser === null ? (
        <div>
          <img
            src={iconNoActiveUser}
            alt="noUser icon"
            height="35px"
            width="35px"
          />
        </div>
      ) : (
        <div>
          <img
            src={userIconMatch[activeUser.gender]}
            alt="user icon"
            height="35px"
            width="35px"
          />
        </div>
      )}
    </UserIconBox>
  )

  renderSettingsIcon = () => (
    <SettingsIconBox>
      <Link to="/settings">
        <img
          src={iconSettings}
          alt="settings icon"
          height="35px"
          width="35px"
        />
      </Link>
    </SettingsIconBox>
  )

  render() {
    const {
      users,
      activeUser,
      children,
      activeUserID,
      isActiveUserSelectorsShown
    } = this.props;

    return (
      <Container onClick={isActiveUserSelectorsShown ? this.handleHideUlersList : () => ''}>
        <Header>
          {this.renderUserIcon(activeUser, users)}
          {this.renderSettingsIcon()}
        </Header>
        <HeaderSubstitute />
        {isActiveUserSelectorsShown && this.renderUsersSelectors(users, activeUserID)}
        <Frame wHeight={this.state.height}>
          {children}
        </Frame>
        <Footer>
          <div>Icons made by <LinkChangeColor color="#ecf1f5" href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</LinkChangeColor> from <LinkChangeColor color="#ecf1f5" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</LinkChangeColor></div>
        </Footer>
      </Container>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(FrameOfDashbord);
