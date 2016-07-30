/* eslint-disable no-underscore-dangle, global-require, no-console */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { trigger } from 'redial';
import { Provider } from 'react-redux';
import store from '../common/store/rehydrateStore';
const { dispatch, getState } = store;

import { Router, match, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getRoutes from '../common/routes/getRoutes';
const routes = getRoutes(getState);
import withScroll from 'scroll-behavior';
const history = syncHistoryWithStore(withScroll(browserHistory), store);

const unsubscribeHistory = history.listen(
  location => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (renderProps) {
        const { components } = renderProps;
        const locals = {
          path: renderProps.location.pathname,
          query: renderProps.location.query,
          params: renderProps.params,
          dispatch,
        };
        if (window.__PRELOADED_STATE__) {
          delete window.__PRELOADED_STATE__;
        } else {
          trigger('fetch', components, locals);
        }
      }
    });
  }
);

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

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    unsubscribeHistory();
  });
}
