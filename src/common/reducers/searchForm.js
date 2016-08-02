import {
  SEARCH_FORM_SET_DEST,
  SEARCH_FORM_SET_STARTDATE,
  SEARCH_FORM_SET_PICKUPTIME,
  SEARCH_FORM_SET_ENDDATE,
  SEARCH_FORM_SET_DROPOFFTIME,

  SEARCH_FORM_CLEAR_DEST,
  SEARCH_FORM_CLEAR_PICKUP,
  SEARCH_FORM_CLEAR_DROPOFF,

} from '../constants';

import update from 'react/lib/update';

const searchForm = (
  state = {
    dest: null,
    destName: null,
    startDate: null,
    pickupTime: null,
    endDate: null,
    dropoffTime: null,
  },
  action
) => {
  switch (action.type) {
    case SEARCH_FORM_SET_DEST:
      return update(state, {
        dest: { $set: action.payload.dest },
        destName: { $set: action.payload.destName },
      });
    case SEARCH_FORM_SET_STARTDATE:
      return update(state, {
        startDate: { $set: action.payload },
      });
    case SEARCH_FORM_SET_PICKUPTIME:
      return update(state, {
        pickupTime: { $set: action.payload },
      });
    case SEARCH_FORM_SET_ENDDATE:
      return update(state, {
        endDate: { $set: action.payload },
      });
    case SEARCH_FORM_SET_DROPOFFTIME:
      return update(state, {
        dropoffTime: { $set: action.payload },
      });
    case SEARCH_FORM_CLEAR_DEST:
      return update(state, {
        dest: { $set: null },
      });
    case SEARCH_FORM_CLEAR_PICKUP:
      return update(state, {
        startDate: { $set: null },
        pickupTime: { $set: null },
        endDate: { $set: null },
        dropoffTime: { $set: null },
      });
    case SEARCH_FORM_CLEAR_DROPOFF:
      return update(state, {
        endDate: { $set: null },
        dropoffTime: { $set: null },
      });
    default:
      return state;
  }
};

export default searchForm;
