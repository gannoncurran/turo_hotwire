/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  // if (process.env.IN_BUNDLE) {
  //   console.log('============================================================');
  //   console.log('============================================================');
  //   console.log('WEBPACK BUNDLE RETURNING STORE FROM CONFIGURE STORE FUNCTION');
  //   console.log('============================================================');
  //   console.log('============================================================');
  // } else {
  //   console.log('============================================================');
  //   console.log('============================================================');
  //   console.log('SSR RETURNING STORE FROM CONFIGURE STORE FUNCTION');
  //   console.log('============================================================');
  //   console.log('============================================================');
  // }
  return store;
};

export default configureStore;
