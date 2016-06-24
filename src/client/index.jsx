/* eslint-disable no-underscore-dangle, global-require */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Router, match, browserHistory } from 'react-router';
import routes from '../common/routes/root';
import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);

import { trigger } from 'redial';
import { Provider } from 'react-redux';
import store from '../common/store/rehydrateStore';
const { dispatch } = store;

const unsubscribeHistory = history.listen(
  location => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
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
