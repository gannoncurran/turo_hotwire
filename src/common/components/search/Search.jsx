/* eslint-disable no-underscore-dangle, no-console */

import React, { PropTypes } from 'react';
import ReactHelmet from 'react-helmet';
import * as searchForm from '../../actions/searchForm';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import buildParams from '../../shared/buildParams';

const _form = {};

const mapStateToProps = state => ({
  dest: state.searchForm.dest,
  startDate: state.searchForm.startDate,
  pickupTime: state.searchForm.pickupTime,
  endDate: state.searchForm.endDate,
  dropoffTime: state.searchForm.dropoffTime,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (query) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(push(`/search/${buildParams(query)}`));
  },
  setDest: () => { dispatch(searchForm.setDest(_form.dest.value)); },
  setStartDate: () => { dispatch(searchForm.setStartDate(_form.startDate.value)); },
  setPickupTime: () => { dispatch(searchForm.setPickupTime(_form.pickupTime.value)); },
  setEndDate: () => { dispatch(searchForm.setEndDate(_form.endDate.value)); },
  setDropoffTime: () => { dispatch(searchForm.setDropoffTime(_form.dropoffTime.value)); },
  reset: (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(searchForm.reset());
  },
});

const Search = ({
  dest,
  startDate,
  pickupTime,
  endDate,
  dropoffTime,
  handleSubmit,
  setDest,
  setStartDate,
  setPickupTime,
  setEndDate,
  setDropoffTime,
  reset,
}) => (
  <div>
    <ReactHelmet title="Search" />
    <div className="subhead">Search</div>
    <form
      onSubmit={handleSubmit({
        dest,
        startDate,
        pickupTime,
        endDate,
        dropoffTime,
      })}
      encType="multipart/form-data"
      method="post"
    >
      <p>
        <input
          ref={c => { _form.dest = c; return; }}
          onChange={setDest}
          id="dest"
          name="dest"
          type="text"
          value={dest}
        />
        <label className="label" htmlFor="dest">Location</label>
      </p>
      <p>
        <input
          ref={c => { _form.startDate = c; return; }}
          onChange={setStartDate}
          id="start-date"
          name="startDate"
          type="text"
          value={startDate}
        />
        <label className="label" htmlFor="start-date">Start Date</label>
      </p>
      <p>
        <input
          ref={c => { _form.pickupTime = c; return; }}
          onChange={setPickupTime}
          id="pickup-time"
          name="pickupTime"
          type="text"
          value={pickupTime}
        />
        <label className="label" htmlFor="pickup-time">Pickup Time</label>
      </p>
      <p>
        <input
          ref={c => { _form.endDate = c; return; }}
          onChange={setEndDate}
          id="end-date"
          name="endDate"
          type="text"
          value={endDate}
        />
        <label className="label" htmlFor="end-date">End Date</label>
      </p>
      <p>
        <input
          ref={c => { _form.dropoffTime = c; return; }}
          onChange={setDropoffTime}
          id="dropoff-time"
          name="dropoffTime"
          type="text"
          value={dropoffTime}
        />
        <label className="label" htmlFor="dropoff-time">Dropoff Time</label>
      </p>
      <button
        onClick={reset}
      >Clear Form</button>
      <button type="submit">Submit</button>
    </form>
  </div>
);

Search.propTypes = {
  dest: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  pickupTime: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  dropoffTime: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setDest: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setPickupTime: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setDropoffTime: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
