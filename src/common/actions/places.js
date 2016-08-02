/* eslint-disable no-console */
import {
  PLACES_AUTOCOMPLETE_REQUEST,
  PLACES_AUTOCOMPLETE_SUCCESS,
  PLACES_AUTOCOMPLETE_FAILURE,

  PLACES_DETAILS_REQUEST,
  PLACES_DETAILS_SUCCESS,
  PLACES_DETAILS_FAILURE,

  SEARCH_FORM_SET_DEST,
} from '../constants';

import throttle from 'lodash.throttle';

// const googlePlaceApiBaseUrl = 'https://maps.googleapis.com/maps/api/place/';
// const googleApiKey = process.env.GOOGLE_PLACES_KEY;
// const googleApiKey = 'AIzaSyByMC8c8OwEUJWKw-vzt1VK7xRwXVn8HVc';

const throttledAcQuery = throttle((axios, dispatch, axiosConfig, query) =>
  axios.get(
    `/api/v1/gp/autocomplete/json?input=${query}`,
    axiosConfig
  )
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: PLACES_AUTOCOMPLETE_SUCCESS,
          payload: res.data.predictions,
        });
      } else {
        dispatch({
          type: PLACES_AUTOCOMPLETE_FAILURE,
          errorMessage: 'Sorry, Hotwire’d is having trouble searching for locations.',
        });
      }
    })
    .catch(error => {
      console.error(`Error in reducer that handles ${PLACES_AUTOCOMPLETE_SUCCESS}: `, error);
      dispatch({
        type: PLACES_AUTOCOMPLETE_FAILURE,
        errorMessage: 'Sorry, Hotwire’d is having trouble searching for locations.',
      });
    }), 1000);

export function autocomplete(query) {
  return (
    dispatch,
    getState,
    { axios }
  ) => {
    dispatch({ type: PLACES_AUTOCOMPLETE_REQUEST, query });
    const srcRequest = getState().sourceRequest;
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
      baseURL: `${srcRequest.protocol}://${srcRequest.host}/`,
    };
    throttledAcQuery(axios, dispatch, axiosConfig, getState().places.autocompleteQuery);
  };
}

export function setDestViaPlace(placeId) {
  return (
    dispatch,
    getState,
    { axios }
  ) => {
    dispatch({ type: PLACES_DETAILS_REQUEST });
    const srcRequest = getState().sourceRequest;
    const axiosConfig = {
      headers: { 'Content-Type': 'application/json' },
      baseURL: `${srcRequest.protocol}://${srcRequest.host}/`,
    };
    axios.get(
      `/api/v1/gp/details/json?placeid=${placeId}`,
      axiosConfig
    )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: PLACES_DETAILS_SUCCESS,
            payload: res.data,
          });
          const result = getState().places.detailsData.result;
          const loc = result.geometry.location;
          const name = result.name;
          dispatch({
            type: SEARCH_FORM_SET_DEST,
            payload: { dest: `${loc.lat},${loc.lng}`, destName: name },
          });
        } else {
          dispatch({
            type: PLACES_DETAILS_FAILURE,
            errorMessage: 'Sorry, Hotwire’d is having trouble searching for locations.',
          });
        }
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${PLACES_DETAILS_SUCCESS}: `, error);
        dispatch({
          type: PLACES_DETAILS_FAILURE,
          errorMessage: 'Sorry, Hotwire’d is having trouble searching for locations.',
        });
      });
  };
}


// export function getDetails(placeId) {
//   return (
//     dispatch,
//     getState,
//     { axios }
//   ) => {
//     console.log('PLACES_DETAILS', placeId);
//     dispatch({ type: PLACES_DETAILS_REQUEST });
//     const axiosConfig = {
//       headers: { 'Content-Type': 'application/json' },
//       baseURL: googlePlaceApiBaseUrl,
//     };
//     return axios.get(
//       `/details/json?key=${googleApiKey}&placeid=${placeId}`,
//       axiosConfig
//     )
//       .then(res => {
//         if (res.data.status === 'OK') {
//           dispatch({
//             type: PLACES_DETAILS_SUCCESS,
//             payload: res.data.result,
//           });
//         } else {
//           dispatch({
//             type: PLACES_DETAILS_FAILURE,
//             errorMessage: 'Sorry, Hotwire’d is having trouble with locations.',
//           });
//         }
//       })
//       .catch(error => {
//         console.error(`Error in reducer that handles ${PLACES_DETAILS_SUCCESS}: `, error);
//         dispatch({
//           type: PLACES_DETAILS_FAILURE,
//           errorMessage: 'Sorry, Hotwire’d is having trouble with locations.',
//         });
//       });
//   };
// }
