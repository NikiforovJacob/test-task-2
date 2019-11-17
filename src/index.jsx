import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './redux/reducers';
import App from './components/App/App';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
/* eslint-enable */

const rootElement = document.getElementById('container');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
