import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions/index';

const mapStateToProps = (state) => {
  const { users: { byId, allIds, activeUser }} = state;
  const users = allIds.map((id) => byId[id]);
  return { users, activeUser };
};

const actionCreators = {
  activateUser: actions.activateUser,
};

class FrameOfDashbord extends React.Component {
  handleActivateUser = (id) => () => {
    const { activateUser } = this.props;
    activateUser({ id });
  };

  renderUsers = (users, activeUser) => (
    <ul>
      {users.map(({
        id,
        firstName,
        secondName
      }) => (
        <li key={`user-${id}`}>
          <span>
            <a onClick={this.handleActivateUser(id)}>
              {activeUser === id ? `${firstName} ${secondName}` : <s>{`${firstName} ${secondName}`}</s>}
            </a>
          </span>
        </li>
      ))}
    </ul>
  )

  render() {
    const { users, activeUser, children } = this.props;

    return (
      <div>
        {users.length === 0 ? null : this.renderUsers(users, activeUser)}
        <Link to="/settings">Settings</Link>
        <div>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(FrameOfDashbord);
