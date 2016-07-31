import {
  SEARCH_FORM_SET_DEST,
  SEARCH_FORM_SET_STARTDATE,
  SEARCH_FORM_SET_PICKUPTIME,
  SEARCH_FORM_SET_ENDDATE,
  SEARCH_FORM_SET_DROPOFFTIME,
  SEARCH_FORM_RESET,
} from '../constants';

import update from 'react/lib/update';

const searchForm = (
  state = {
    dest: '',
    startDate: '',
    pickupTime: '',
    endDate: '',
    dropoffTime: '',
  },
  action
) => {
  switch (action.type) {
    case SEARCH_FORM_SET_DEST:
      return update(state, {
        dest: { $set: action.payload },
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
    case SEARCH_FORM_RESET:
      return update(state, {
        dest: { $set: '' },
        startDate: { $set: '' },
        pickupTime: { $set: '' },
        endDate: { $set: '' },
        dropoffTime: { $set: '' },
      });
    default:
      return state;
  }
};

export default searchForm;
