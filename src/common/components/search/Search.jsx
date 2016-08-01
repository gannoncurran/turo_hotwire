/* eslint-disable no-underscore-dangle, no-console */

import React, { PropTypes } from 'react';
import ReactHelmet from 'react-helmet';
import * as searchForm from '../../actions/searchForm';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import buildParams from '../../helpers/buildParams';

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
  <div className="search">
    <ReactHelmet title="Search" />
    <form
      className="form"
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
      <div className="form__input-group">
        <div className="form__compound-field">
          <input
            className="form__input"
            ref={c => { _form.dest = c; return; }}
            onChange={setDest}
            id="dest"
            name="dest"
            type="text"
            placeholder="City Name or Airport Code"
            value={dest}
          />
        </div>
        <label className="form__label" htmlFor="dest">Pickup Location</label>
      </div>
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
