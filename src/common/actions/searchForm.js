/* eslint-disable no-console */
import {
  SEARCH_FORM_SET_DEST,
  SEARCH_FORM_SET_STARTDATE,
  SEARCH_FORM_SET_PICKUPTIME,
  SEARCH_FORM_SET_ENDDATE,
  SEARCH_FORM_SET_DROPOFFTIME,
  SEARCH_FORM_RESET,
} from '../constants';

export function setDest(dest) {
  return {
    type: SEARCH_FORM_SET_DEST,
    payload: dest,
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

export function reset() {
  return {
    type: SEARCH_FORM_RESET,
  };
}
