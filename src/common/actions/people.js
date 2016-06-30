/* eslint-disable no-console */
import {
  LOAD_PEOPLE_REQUEST,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PEOPLE_FAILURE,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  UPDATE_PERSON_REQUEST,
  UPDATE_PERSON_SUCCESS,
  UPDATE_PERSON_FAILURE,
} from '../constants';

export function loadPeople() {
  return (
    dispatch,
    getState,
    { axios }
  ) => {
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

export function updatePerson(person) {
  return (
    dispatch,
    getState,
    { axios }
  ) => {
    dispatch({
      type: UPDATE_PERSON_REQUEST,
      personId: person.id,
    });
    return axios.post(`http://localhost:3000/api/v0/person/${person.id}/counter/${person.counter}`)
      .then(res => {
        dispatch({
          type: UPDATE_PERSON_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now(),
          },
        });
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${UPDATE_PERSON_SUCCESS}: `, error);
        dispatch({
          type: UPDATE_PERSON_FAILURE,
          payload: error,
          error: true,
        });
      });
  };
}

export function incrementCounter(personId) {
  return (
    dispatch,
    getState
  ) => {
    dispatch({
      type: INCREMENT_COUNTER,
      personId,
    });
    const person = getState().people.data.find(p => p.data.id === personId);
    dispatch(updatePerson(person.data));
  };
}

export function decrementCounter(personId) {
  return (
    dispatch,
    getState
  ) => {
    dispatch({
      type: DECREMENT_COUNTER,
      personId,
    });
    const person = getState().people.data.find(p => p.data.id === personId);
    dispatch(updatePerson(person.data));
  };
}

// export function incrementCounter(personId) {
//   return {
//     type: INCREMENT_COUNTER,
//     personId,
//   };
// }
//
// export function decrementCounter(personId) {
//   return {
//     type: DECREMENT_COUNTER,
//     personId,
//   };
// }
