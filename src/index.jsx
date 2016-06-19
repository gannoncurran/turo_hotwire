import React from 'react';
import ReactDOM from 'react-dom';

import { Router, match, browserHistory } from 'react-router';
import routes from './routes';
import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

// TODO finish this redux work in progress
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// import { createStore, combineReducers } from 'redux';
// import { configureStore } from '../common/store'
// const initialState = window.INITIAL_STATE || {}
// const store = configureStore(initialState)

if (module.hot) {
  module.hot.accept();
}

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

// TODO finish this redux work in progress
// match({ routes, location }, () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <Router
//         routes={routes}
//         history={history}
//         key={Math.random()}
//       />
//     </Provider>,
//     document.getElementById('react-render-target')
//   );
// });
