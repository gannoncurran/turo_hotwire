/* eslint-disable no-console */
import { LOAD_PEOPLE_REQUEST, LOAD_PEOPLE_SUCCESS, LOAD_PEOPLE_FAILURE } from '../constants';

export function loadPeople() {
  return (
    dispatch,
    getState,
    { axios }
  ) => {
    console.log('DISPATCHING LOAD PEOPLE REQUEST');
    dispatch({ type: LOAD_PEOPLE_REQUEST });
    return axios.get('http://localhost:3000/api/v0/people')
      .then(res => {
        dispatch({
          type: LOAD_PEOPLE_SUCCESS,
          payload: res.data.people,
          meta: {
            lastFetched: Date.now(),
          },
        });
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_PEOPLE_SUCCESS}: `, error);
        dispatch({
          type: LOAD_PEOPLE_FAILURE,
          payload: error,
          error: true,
        });
      });
  };
}
