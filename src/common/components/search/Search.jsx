/* eslint-disable no-underscore-dangle, no-console */

import React, { Component, PropTypes } from 'react';
import ReactHelmet from 'react-helmet';
import * as searchFormActions from '../../actions/searchForm';
import * as placesActions from '../../actions/places';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import buildParams from '../../helpers/buildParams';

const _form = {};

const mapStateToProps = state => ({
  places: state.places,
  predictions: state.places.autocompleteData,
  placeDetails: state.places.detailsData,
  dest: state.searchForm.dest,
  startDate: state.searchForm.startDate,
  pickupTime: state.searchForm.pickupTime,
  endDate: state.searchForm.endDate,
  dropoffTime: state.searchForm.dropoffTime,
});

const mapDispatchToProps = (dispatch) => ({
  handlePlaceChange: () => { dispatch(placesActions.autocomplete(_form.dest.value)); },
  handleSubmit: (query) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(push(`/search/${buildParams(query)}`));
  },
  setDest: (locString) => { dispatch(searchFormActions.setDest(locString)); },
  setStartDate: () => { dispatch(searchFormActions.setStartDate(_form.startDate.value)); },
  setPickupTime: () => { dispatch(searchFormActions.setPickupTime(_form.pickupTime.value)); },
  setEndDate: () => { dispatch(searchFormActions.setEndDate(_form.endDate.value)); },
  setDropoffTime: () => { dispatch(searchFormActions.setDropoffTime(_form.dropoffTime.value)); },
  clearDest: () => { dispatch(searchFormActions.clearDest()); },
  clearStartDate: () => { dispatch(searchFormActions.clearStartDate()); },
  clearPickupTime: () => { dispatch(searchFormActions.clearPickupTime()); },
  clearEndDate: () => { dispatch(searchFormActions.clearEndDate()); },
  clearDropoffTime: () => { dispatch(searchFormActions.clearDropoffTime()); },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: false,
    };
    this.tryGeolocation = () => {
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        this.setState({ navigator: true });
      }
    };
    this.getCurrentLocation = (setDestCb) => (e) => {
      console.log('DEST CALLBACK');
      console.log(setDestCb);
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
      navigator.geolocation.getCurrentPosition((loc) => {
        setDestCb(`${loc.coords.latitude},${loc.coords.longitude}`);
      });
    };
  }

  render() {
    const {
      places,
      predictions,
      placeDetails,
      dest,
      startDate,
      pickupTime,
      endDate,
      dropoffTime,
      handlePlaceChange,
      setDest,
      setStartDate,
      setPickupTime,
      setEndDate,
      setDropoffTime,
    } = this.props;
    return (
      <div className="search">
        <ReactHelmet title="Search" />
        <form
          className="form"
        >
          {!dest &&
            <div className="form__input-group">
              <div className="form__compound-field">
                <input
                  className="form__input"
                  ref={c => { _form.dest = c; return; }}
                  onChange={handlePlaceChange}
                  onFocus={this.tryGeolocation}
                  id="dest"
                  name="dest"
                  type="text"
                  placeholder="City Name or Point of Interest"
                  value={places.autocompleteQuery}
                />
                <button
                  className={
                    `form__compound-button${this.state.navigator
                      ? ' form__compound-button--enabled'
                      : ''}`
                  }
                  onClick={this.getCurrentLocation(setDest)}
                >Use Current<br />Location</button>
              </div>
              <label className="form__label" htmlFor="dest">Pickup Location</label>
            </div>
          }
          {predictions.length > 0 &&
            <div>
              {
                predictions.map((prediction, i) => (
                  <div
                    key={i}
                    className="form__prediction"
                  >
                    <p
                      style={{ color: '#fff' }}
                      key={prediction.id}
                    >
                      {prediction.description}
                    </p>
                  </div>
                ))
              }
            </div>
          }
          {dest && !startDate &&
            <p>
              <input
                ref={c => { _form.startDate = c; return; }}
                onChange={setStartDate}
                id="start-date"
                name="startDate"
                type="text"
                value={startDate || ''}
              />
              <label className="label" htmlFor="start-date">Start Date</label>
            </p>
          }
          {dest && startDate && !pickupTime &&
            <p>
              <input
                ref={c => { _form.pickupTime = c; return; }}
                onChange={setPickupTime}
                id="pickup-time"
                name="pickupTime"
                type="text"
                value={pickupTime || ''}
              />
              <label className="label" htmlFor="pickup-time">Pickup Time</label>
            </p>
          }
          {dest && startDate && pickupTime && !endDate &&
            <p>
              <input
                ref={c => { _form.endDate = c; return; }}
                onChange={setEndDate}
                id="end-date"
                name="endDate"
                type="text"
                value={endDate || ''}
              />
              <label className="label" htmlFor="end-date">End Date</label>
            </p>
          }
          {dest && startDate && pickupTime && endDate && !dropoffTime &&
            <p>
              <input
                ref={c => { _form.dropoffTime = c; return; }}
                onChange={setDropoffTime}
                id="dropoff-time"
                name="dropoffTime"
                type="text"
                value={dropoffTime || ''}
              />
              <label className="label" htmlFor="dropoff-time">Dropoff Time</label>
            </p>
          }
          {dest && startDate && pickupTime && endDate && dropoffTime &&
            <p style={{ color: '#fff' }}>--- SUBMIT ---</p>
          }
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  places: PropTypes.object.isRequired,
  predictions: PropTypes.array.isRequired,
  placeDetails: PropTypes.object.isRequired,
  dest: PropTypes.string,
  startDate: PropTypes.string,
  pickupTime: PropTypes.string,
  endDate: PropTypes.string,
  dropoffTime: PropTypes.string,
  handlePlaceChange: PropTypes.func.isRequired,
  setDest: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setPickupTime: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setDropoffTime: PropTypes.func.isRequired,
  clearDest: PropTypes.func.isRequired,
  clearStartDate: PropTypes.func.isRequired,
  clearPickupTime: PropTypes.func.isRequired,
  clearEndDate: PropTypes.func.isRequired,
  clearDropoffTime: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
