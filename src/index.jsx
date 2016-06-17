import React from 'react';
import ReactDOM from 'react-dom';
import { Router, match, browserHistory } from 'react-router';

import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);

if (module.hot) {
  module.hot.accept();
}

import routes from './routes';
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

match({ routes, location }, () => {
  ReactDOM.render(
    <Router
      routes={routes}
      history={history}
      key={Math.random()}
    />,
    document.getElementById('react-render-target')
  );
});
