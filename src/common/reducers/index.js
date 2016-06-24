import { combineReducers } from 'redux';
import counter from './counter';
import people from './people';

const rootReducer = combineReducers({
  counter,
  people,
});

export default rootReducer;
