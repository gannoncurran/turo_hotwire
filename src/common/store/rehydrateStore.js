/* eslint-disable no-underscore-dangle */
import configureStore from './configureStore';
console.log('PRELOADED STATE\n', __PRELOADED_STATE__);
const store = configureStore(window.__PRELOADED_STATE__);
export default store;
