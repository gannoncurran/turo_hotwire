import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sourceRequest from './sourceRequest';
import people from './people';

const rootReducer = combineReducers({
  sourceRequest,
  people,
  routing: routerReducer,
});

export default rootReducer;
