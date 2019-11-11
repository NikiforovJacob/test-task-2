import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Header } from './AppStyle';
import { Login } from '../Login/Login';
import Settings from '../Settings/Settings';
import Dashbord from '../Dashboard/Dashbord';
import FrameOfDashbord from '../FrameOfDashbord/FrameOfDashbord';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gg: 'test-task'
    };
  }

  render() {
    // sourceCoinMarketCap.getData(1, 5, console.log);
    // .then((value) => this.setState({ gg: value }));
    console.log(Math.random().toString(36).substr(2));
    const { gg } = this.state;
    return (
      <div>
        <Router>
          <div>
            <Header>{gg}</Header>
            <Switch>
              <Route path="/dashbord">
                <FrameOfDashbord>
                  <Dashbord />
                </FrameOfDashbord>
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
