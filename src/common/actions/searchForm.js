/* eslint-disable no-console */
import {
  SEARCH_FORM_SET_DEST,
  SEARCH_FORM_SET_STARTDATE,
  SEARCH_FORM_SET_PICKUPTIME,
  SEARCH_FORM_SET_ENDDATE,
  SEARCH_FORM_SET_DROPOFFTIME,

  SEARCH_FORM_CLEAR_DEST,
  SEARCH_FORM_CLEAR_STARTDATE,
  SEARCH_FORM_CLEAR_PICKUPTIME,
  SEARCH_FORM_CLEAR_ENDDATE,
  SEARCH_FORM_CLEAR_DROPOFFTIME,

} from '../constants';

export function setDest(dest, destName) {
  return {
    type: SEARCH_FORM_SET_DEST,
    payload: { dest, destName },
  };
}

export function setStartDate(startDate) {
  return {
    type: SEARCH_FORM_SET_STARTDATE,
    payload: startDate,
  };
}

export function setPickupTime(pickupTime) {
  return {
    type: SEARCH_FORM_SET_PICKUPTIME,
    payload: pickupTime,
  };
}

export function setEndDate(endDate) {
  return {
    type: SEARCH_FORM_SET_ENDDATE,
    payload: endDate,
  };
}

export function setDropoffTime(dropoffTime) {
  return {
    type: SEARCH_FORM_SET_DROPOFFTIME,
    payload: dropoffTime,
  };
}

export function clearDest(dest) {
  return {
    type: SEARCH_FORM_CLEAR_DEST,
    payload: dest,
  };
}

export function clearStartDate(startDate) {
  return {
    type: SEARCH_FORM_CLEAR_STARTDATE,
    payload: startDate,
  };
}

export function clearPickupTime(pickupTime) {
  return {
    type: SEARCH_FORM_CLEAR_PICKUPTIME,
    payload: pickupTime,
  };
}

export function clearEndDate(endDate) {
  return {
    type: SEARCH_FORM_CLEAR_ENDDATE,
    payload: endDate,
  };
}

export function clearDropoffTime(dropoffTime) {
  return {
    type: SEARCH_FORM_CLEAR_DROPOFFTIME,
    payload: dropoffTime,
  };
}
