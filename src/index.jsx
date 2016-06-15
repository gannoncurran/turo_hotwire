import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);

if (module.hot) {
  module.hot.accept();
}

import routes from './routes';

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
    key={Math.random()}
  />, document.getElementById('react-render-target')
);
