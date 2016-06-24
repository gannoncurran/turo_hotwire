/* eslint-disable no-underscore-dangle */
import configureStore from './configureStore';

const store = configureStore(window.__PRELOADED_STATE__);
export default store;
