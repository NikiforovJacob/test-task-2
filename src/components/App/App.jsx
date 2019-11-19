import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { getObjectFromSessionStorage } from '../../utils/utils';

import { Header } from './AppStyle';
import Login from '../Login/Login';
import Settings from '../Settings/Settings';
import FrameOfDashbord from '../FrameOfDashbord/FrameOfDashbord';
import Dashbord from '../Dashboard/Dashbord';
import CardContent from '../CardContent/CardContent';

const mapStateToProps = (state) => {
  const { authorization: { isAuthorized }, uiState: { openedCardDescription } } = state;
  return { isAuthorized, openedCardDescription };
};

const actionCreators = {
  initializeUsersState: actions.initializeUsersState
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gg: 'test-task'
    };
  }

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
    const { gg } = this.state;
    const { isAuthorized, openedCardDescription } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Header>{gg}</Header>
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
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);
