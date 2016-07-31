import {
  CARS_SEARCH_REQUEST,
  CARS_SEARCH_SUCCESS,
  CARS_SEARCH_FAILURE,
} from '../constants';

import update from 'react/lib/update';

const cars = (
  state = {
    data: {},
    isLoading: false,
    error: false,
    errorMessage: '',
  },
  action
) => {
  switch (action.type) {
    case CARS_SEARCH_REQUEST:
      return update(state, {
        isLoading: { $set: true },
        error: { $set: false },
      });
    case CARS_SEARCH_SUCCESS:
      return update(state, {
        data: { $set: action.payload },
        isLoading: { $set: false },
        error: { $set: false },
      });
    case CARS_SEARCH_FAILURE:
      return update(state, {
        isLoading: { $set: false },
        error: { $set: true },
        errorMessage: { $set: action.errorMessage },
      });
    default:
      return state;
  }
};

export default cars;
