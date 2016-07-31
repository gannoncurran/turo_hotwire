/* eslint-disable no-console */
import {
  CARS_SEARCH_REQUEST,
  CARS_SEARCH_SUCCESS,
  CARS_SEARCH_FAILURE,
} from '../constants';

export function carsSearch(query) {
  return (
    dispatch,
    getState,
    { axios }
  ) => {
    console.log('CARS_SEARCH_REQUEST', query);
    dispatch({ type: CARS_SEARCH_REQUEST });
    const srcRequest = getState().sourceRequest;
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
      baseURL: `${srcRequest.protocol}://${srcRequest.host}/`,
    };
    return axios.get(
      `/api/v1/${query}`,
      axiosConfig
    )
      .then(res => {
        if (res.data.op === 'carssearch' && res.data.success) {
          console.log('AJAX RESPONSE:\n', res.data);
          dispatch({
            type: CARS_SEARCH_SUCCESS,
            payload: res.data.apiResponse,
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
