/* eslint-disable no-underscore-dangle, global-require */
if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Router, match, browserHistory } from 'react-router';
import routes from '../common/routes/root';
import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

import { Provider } from 'react-redux';
import store from '../common/store';

match({ routes, location }, () => {
  render(
    <Provider
      store={store}
    >
      <Router
        routes={routes}
        history={history}
        key={Math.random()}
      />
    </Provider>,
    document.getElementById('react-render-target')
  );
});
