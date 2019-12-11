import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { authorizationSelector, openedCardDescriptionSelector } from '../../redux/selectors';
import { getObjectFromSessionStorage } from '../../utils/utils';

import Login from '../Login/Login';
import Settings from '../Settings/Settings';
import FrameOfDashbord from '../FrameOfDashbord/FrameOfDashbord';
import Dashbord from '../Dashboard/Dashbord';
import CardContent from '../CardContent/CardContent';

const mapStateToProps = (state) => ({
  isAuthorized: authorizationSelector(state),
  openedCardDescription: openedCardDescriptionSelector(state)
});

const actionCreators = {
  initializeUsersState: actions.initializeUsersState
};

class App extends Component {
  componentDidMount() {
    const { initializeUsersState } = this.props;
    const appDataUsers = getObjectFromSessionStorage('appDataUsers');
    if (appDataUsers !== null) {
      initializeUsersState({ appDataUsers });
    }
  }

  renderDashbord = (openedCardDescription) => (
    <FrameOfDashbord>
      {openedCardDescription === null ? <Dashbord /> : <CardContent />}
    </FrameOfDashbord>
  )

  renderSettings = () => (
    <FrameOfDashbord>
      <Settings />
    </FrameOfDashbord>
  )

  render() {
    const { isAuthorized, openedCardDescription } = this.props;
    return (
      <Router>
        <Switch>
          <Route path="/dashbord">
            {isAuthorized ? this.renderDashbord(openedCardDescription) : <Redirect to="/" />}
          </Route>
          <Route path="/settings">
            {isAuthorized ? this.renderSettings() : <Redirect to="/" />}
          </Route>
          <Route path="/">
            {isAuthorized ? <Redirect to="/dashbord" /> : <Login />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);
