/* eslint-disable no-underscore-dangle */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Router, match, browserHistory } from 'react-router';
import routes from '../common/routes/routes';
import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

if (module.hot) {
  module.hot.accept();
}

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
