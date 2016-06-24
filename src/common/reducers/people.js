import { LOAD_PEOPLE_REQUEST, LOAD_PEOPLE_SUCCESS, LOAD_PEOPLE_FAILURE } from '../constants';
import update from 'react/lib/update';

const people = (
  state = {
    data: [],
    lastFetched: null,
    isLoading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case LOAD_PEOPLE_REQUEST:
      return update(state, {
        isLoading: { $set: true },
      });
    case LOAD_PEOPLE_SUCCESS:
      return update(state, {
        data: { $set: action.payload },
        lastFetched: { $set: action.meta.lastFetched },
        isLoading: { $set: false },
      });
    case LOAD_PEOPLE_FAILURE:
      return update(state, {
        error: { $set: action.payload },
      });
    default:
      return state;
  }
};

export default people;
