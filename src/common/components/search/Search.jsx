/* eslint-disable no-underscore-dangle, no-console */

import React, { Component, PropTypes } from 'react';
import ReactHelmet from 'react-helmet';
import * as searchFormActions from '../../actions/searchForm';
import * as placesActions from '../../actions/places';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import buildParams from '../../helpers/buildParams';

import Cal from './Cal';
import TimePicker from './TimePicker';

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
    console.log('QUERY', query);
    console.log(`/search/${buildParams(query)}`);
    dispatch(push(`/search/${buildParams(query)}`));
  },
  setDestViaPlace: (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(placesActions.setDestViaPlace(e.target.id));
  },
  handlePlaceChange: () => { dispatch(placesActions.autocomplete(_form.dest.value)); },
  setDest: (locString, destName) => { dispatch(searchFormActions.setDest(locString, destName)); },
  setStartDate: (dateString) => () => { dispatch(searchFormActions.setStartDate(dateString)); },
  setPickupTime: (timeString) => () => { dispatch(searchFormActions.setPickupTime(timeString)); },
  setEndDate: (dateString) => () => { dispatch(searchFormActions.setEndDate(dateString)); },
  setDropoffTime: (timeString) => () => { dispatch(searchFormActions.setDropoffTime(timeString)); },
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
      handleSubmit,
      setStartDate,
      setPickupTime,
      setEndDate,
      setDropoffTime,
    } = this.props;
    return (
      <div
        className={`search${dest ? ' search--white-bg' : ''}`}
      >
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
              <Cal
                setDate={setStartDate}
              />
            </div>
          }
          {dest && startDate && !pickupTime &&
            <TimePicker
              setTime={setPickupTime}
            />
          }
          {dest && startDate && pickupTime && !endDate &&
            <div>
              <Cal
                pickupDate={startDate}
                setDate={setEndDate}
              />
            </div>
          }
          {dest && startDate && pickupTime && endDate && !dropoffTime &&
            <TimePicker
              setTime={setDropoffTime}
            />
          }
          {dest && startDate && pickupTime && endDate && dropoffTime &&
            <p
              onClick={handleSubmit({
                dest,
                startDate,
                pickupTime,
                endDate,
                dropoffTime,
              })}
              style={{
                color: '#000',
              }}
            >
              --- SUBMIT ---
            </p>
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
  handleSubmit: PropTypes.func.isRequired,
  handlePlaceChange: PropTypes.func.isRequired,
  setDest: PropTypes.func.isRequired,
  setDestViaPlace: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setPickupTime: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setDropoffTime: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
