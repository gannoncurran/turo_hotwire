/* eslint-disable no-underscore-dangle, no-console */

import React, { Component, PropTypes } from 'react';
import ReactHelmet from 'react-helmet';
import * as searchFormActions from '../../actions/searchForm';
import * as placesActions from '../../actions/places';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import buildParams from '../../helpers/buildParams';
import moment from 'moment';

import Day from './Day';

const _form = {};

const mapStateToProps = state => ({
  places: state.places,
  predictions: state.places.autocompleteData,
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
  setDestViaPlace: (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(placesActions.setDestViaPlace(e.target.id));
  },
  handlePlaceChange: () => { dispatch(placesActions.autocomplete(_form.dest.value)); },
  setDest: (locString, destName) => { dispatch(searchFormActions.setDest(locString, destName)); },
  setStartDate: () => { dispatch(searchFormActions.setStartDate(_form.startDate.value)); },
  setPickupTime: () => { dispatch(searchFormActions.setPickupTime(_form.pickupTime.value)); },
  setEndDate: () => { dispatch(searchFormActions.setEndDate(_form.endDate.value)); },
  setDropoffTime: () => { dispatch(searchFormActions.setDropoffTime(_form.dropoffTime.value)); },
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: false,
      locating: false,
    };
    this.tryGeolocation = () => {
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        this.setState({ navigator: true });
      }
    };
    this.getCurrentLocation = (setDestCb) => (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
      this.setState({ locating: true });
      navigator.geolocation.getCurrentPosition((loc) => {
        this.setState({ locating: false });
        setDestCb(`${loc.coords.latitude},${loc.coords.longitude}`, 'Current Location');
      });
    };
  }

  render() {
    const {
      places,
      predictions,
      dest,
      startDate,
      pickupTime,
      endDate,
      dropoffTime,
      handlePlaceChange,
      setDest,
      setDestViaPlace,
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
                  autoComplete="off"
                  placeholder="City or Place Name"
                  value={places.autocompleteQuery}
                />
                <button
                  className={
                    `form__compound-button${this.state.navigator
                      ? ' form__compound-button--enabled'
                      : ''}`
                  }
                  onClick={this.getCurrentLocation(setDest)}
                >
                  {this.state.locating
                    ? 'Locating…'
                    : <span>Use Current<br />Location</span>
                  }
                </button>
              </div>
              <label className="form__label" htmlFor="dest">Pickup Location</label>
            </div>
          }
          {!dest && predictions.length > 0 &&
            <ul
              className="predictions__list"
            >
              {
                predictions.map((prediction) => (
                  <li
                    className="predictions__item"
                    key={prediction.id}
                    style={{ color: '#fff' }}
                  >
                    <a
                      id={prediction.place_id}
                      onClick={setDestViaPlace}
                      className="predictions__link"
                      href="#"
                    >{prediction.description}</a>
                  </li>
                ))
              }
            </ul>
          }
          {dest && !startDate &&
            <div>
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
              <Day
                pickupDate={moment().format('YYYY-MM-DD')}
                year={2016}
                month={8}
                day={2}
              />
            </div>
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
  dest: PropTypes.string,
  startDate: PropTypes.string,
  pickupTime: PropTypes.string,
  endDate: PropTypes.string,
  dropoffTime: PropTypes.string,
  handlePlaceChange: PropTypes.func.isRequired,
  setDest: PropTypes.func.isRequired,
  setDestViaPlace: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setPickupTime: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setDropoffTime: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
