/* eslint-disable no-console */
import {
  CARS_SEARCH_REQUEST,
  CARS_SEARCH_SUCCESS,
  CARS_SEARCH_FAILURE,
} from '../constants';

import buildParams from '../shared/buildParams';

export function carsSearch(query) {
  return (
    dispatch,
    getState,
    { axios }
  ) => {
    dispatch({ type: CARS_SEARCH_REQUEST });
    const srcRequest = getState().sourceRequest;
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
      baseURL: `${srcRequest.protocol}://${srcRequest.host}/`,
    };
    return axios.get(`/api/v0/${buildParams(query)}`, axiosConfig)
      .then(res => {
        if (res.data.op === 'carssearch' && res.data.success) {
          dispatch({
            type: CARS_SEARCH_SUCCESS,
            payload: res.data.cars,
          });
        } else {
          dispatch({
            type: CARS_SEARCH_FAILURE,
          });
        }
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${CARS_SEARCH_SUCCESS}: `, error);
        dispatch({
          type: CARS_SEARCH_FAILURE,
        });
      });
  };
}
