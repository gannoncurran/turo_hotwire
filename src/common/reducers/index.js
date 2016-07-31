import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cars from './cars';
import searchForm from './searchForm';
import sourceRequest from './sourceRequest';

const rootReducer = combineReducers({
  cars,
  searchForm,
  sourceRequest,
  routing: routerReducer,
});

export default rootReducer;
