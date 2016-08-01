import {
  PLACES_AUTOCOMPLETE_REQUEST,
  PLACES_AUTOCOMPLETE_SUCCESS,
  PLACES_AUTOCOMPLETE_FAILURE,

  PLACES_DETAILS_REQUEST,
  PLACES_DETAILS_SUCCESS,
  PLACES_DETAILS_FAILURE,
} from '../constants';

import update from 'react/lib/update';

const places = (
  state = {
    autocompleteData: [],
    autocompleteQuery: '',
    autocompleteIsLoading: false,
    autocompleteError: false,
    autocompleteErrorMessage: '',
    detailsData: {},
    detailsIsLoading: false,
    detailsError: false,
    detailsErrorMessage: '',
  },
  action
) => {
  switch (action.type) {
    case PLACES_AUTOCOMPLETE_REQUEST:
      return update(state, {
        autocompleteIsLoading: { $set: true },
        autocompleteError: { $set: false },
        autocompleteQuery: { $set: action.query },
      });
    case PLACES_AUTOCOMPLETE_SUCCESS:
      return update(state, {
        autocompleteData: { $set: action.payload },
        autocompleteIsLoading: { $set: false },
        autocompleteError: { $set: false },
      });
    case PLACES_AUTOCOMPLETE_FAILURE:
      return update(state, {
        autocompleteIsLoading: { $set: false },
        autocompleteError: { $set: true },
        autocompleteErrorMessage: { $set: action.errorMessage },
      });
    case PLACES_DETAILS_REQUEST:
      return update(state, {
        detailsIsLoading: { $set: true },
        detailsError: { $set: false },
      });
    case PLACES_DETAILS_SUCCESS:
      return update(state, {
        detailsData: { $set: action.payload },
        detailsIsLoading: { $set: false },
        detailsError: { $set: false },
      });
    case PLACES_DETAILS_FAILURE:
      return update(state, {
        detailsIsLoading: { $set: false },
        detailsError: { $set: true },
        detailsErrorMessage: { $set: action.errorMessage },
      });
    default:
      return state;
  }
};

export default places;
