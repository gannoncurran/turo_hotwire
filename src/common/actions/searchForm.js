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

  SEARCH_FORM_CLEAR_PICKUP,
  SEARCH_FORM_CLEAR_DROPOFF,

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

export function clearDest() {
  return {
    type: SEARCH_FORM_CLEAR_DEST,
  };
}

export function clearPickup() {
  return {
    type: SEARCH_FORM_CLEAR_PICKUP,
  };
}

export function clearStartDate() {
  return {
    type: SEARCH_FORM_CLEAR_STARTDATE,
  };
}

export function clearPickupTime() {
  return {
    type: SEARCH_FORM_CLEAR_PICKUPTIME,
  };
}

export function clearDropoff() {
  return {
    type: SEARCH_FORM_CLEAR_DROPOFF,
  };
}

export function clearEndDate() {
  return {
    type: SEARCH_FORM_CLEAR_ENDDATE,
  };
}

export function clearDropoffTime() {
  return {
    type: SEARCH_FORM_CLEAR_DROPOFFTIME,
  };
}
