import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);

import routes from './routes';

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
  />, document.getElementById('react-render-target')
);
