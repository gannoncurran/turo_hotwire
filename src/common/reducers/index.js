import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cars from './cars';
import places from './places';
import searchForm from './searchForm';
import sourceRequest from './sourceRequest';

const rootReducer = combineReducers({
  cars,
  places,
  searchForm,
  sourceRequest,
  routing: routerReducer,
});

export default rootReducer;
