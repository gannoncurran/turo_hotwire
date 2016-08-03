/* eslint-disable no-underscore-dangle, no-console */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as searchFormActions from '../../actions/searchForm';
import { push } from 'react-router-redux';
import buildParams from '../../helpers/buildParams';
import moment from 'moment';

const mapStateToProps = state => ({
  predictions: state.places.autocompleteData,
  dest: state.searchForm.dest,
  destName: state.searchForm.destName,
  startDate: state.searchForm.startDate,
  pickupTime: state.searchForm.pickupTime,
  endDate: state.searchForm.endDate,
  dropoffTime: state.searchForm.dropoffTime,
  cars: state.cars,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (query) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('QUERY', query);
    console.log(`/search/${buildParams(query)}`);
    dispatch(push(`/search/${buildParams(query)}`));
  },
  clearDest: () => { dispatch(searchFormActions.clearDest()); },
  clearPickup: () => { dispatch(searchFormActions.clearPickup()); },
  clearDropoff: () => { dispatch(searchFormActions.clearDropoff()); },
});

class Header extends Component {
  render() {
    const {
      predictions,
      dest,
      destName,
      startDate,
      pickupTime,
      endDate,
      dropoffTime,
      clearDest,
      clearPickup,
      clearDropoff,
      cars,
      handleSubmit,
    } = this.props;
    return (
      <header
        className={
          `header${predictions.length !== 0 || dest ? ' header--compact' : ''}`
        }
      >
        <div
          ref={c => { this._intro = c; return; }}
          className="intro"
        >
          <div className="ident-wrapper">
            <div className="car-icon"></div>
            <h1 className="hotwired">
              HOTWIRE<span className="hotwired__apostrophe">’</span>D
            </h1>
          </div>
          <div className="welcome-wrapper">
            <p
              className="welcome-message"
            >
              Use the Hotwire rental car search engine to find rental cars fast.<br />
              Let’s get you into the driver’s seat and out on the road.
            </p>
          </div>
        </div>
        <div
          className={`summary${
            (!cars.isLoading &&
            cars.data.length > 0)
            ? ' summary--results'
            : ''}`}
        >
          {dest &&
            <div className="summary__item">
              <p className="summary__title">Location:</p>
              <p className="summary__text">{destName}</p>
              {!cars.isLoading && cars.data.length === 0 &&
                <a
                  href="#"
                  onClick={clearDest}
                  className="summary__delete-link"
                ><span className="icon icon-delete"></span></a>
              }
            </div>
          }
          {(startDate || pickupTime) &&
            <div className="summary__item">
              <div className="summary__marker summary__marker--pickup"></div>
              <p className="summary__title">Pick Up:</p>
              <p className="summary__text">
                {moment(startDate, 'YYYY-MM-DD').format('ddd, MMM DD, YYYY')}
                {pickupTime ? ` at ${moment(`2016-01-01 ${pickupTime}`, 'YYYY-MM-DD HH:mm').format('h:mm a')}` : ''}
              </p>
              {!cars.isLoading && cars.data.length === 0 &&
                <a
                  href="#"
                  onClick={clearPickup}
                  className="summary__delete-link"
                ><span className="icon icon-delete"></span></a>
              }
            </div>
          }
          {(endDate || dropoffTime) &&
            <div className="summary__item">
              <div className="summary__marker summary__marker--dropoff"></div>
              <p className="summary__title">Drop Off:</p>
              <p className="summary__text">
                {moment(endDate, 'YYYY-MM-DD').format('ddd, MMM DD, YYYY')}
                {dropoffTime ? ` at ${moment(`2016-01-01 ${dropoffTime}`, 'YYYY-MM-DD HH:mm').format('h:mm a')}` : ''}
              </p>
              {!cars.isLoading && cars.data.length === 0 &&
                <a
                  href="#"
                  onClick={clearDropoff}
                  className="summary__delete-link"
                ><span className="icon icon-delete"></span></a>
              }
            </div>
          }
          {!cars.isLoading &&
            cars.data.length === 0 &&
            dest &&
            startDate &&
            pickupTime &&
            endDate &&
            dropoffTime &&
            <div
              className="summary__item submit"
            >
              <button
                className="submit__button"
                onClick={handleSubmit({
                  dest,
                  startDate,
                  pickupTime,
                  endDate,
                  dropoffTime,
                })}
              >
                Search
              </button>
            </div>
          }
        </div>
        <div className="action-label">
          {
            !dest &&
              <h2
                className="action-label__title"
              >Where To?</h2>
          }
          {
            dest &&
            !startDate &&
              <h2
                className="action-label__title action-label__title--pickup"
              >Select Pickup Date</h2>
          }
          {
            dest &&
            startDate &&
            !pickupTime &&
              <h2
                className="action-label__title action-label__title--pickup"
              >Select Pickup Time</h2>
          }
          {
            dest &&
            startDate &&
            pickupTime &&
            !endDate &&
              <h2
                className="action-label__title action-label__title--dropoff"
              >Select Dropoff Date</h2>
          }
          {
            dest &&
            startDate &&
            pickupTime &&
            endDate &&
            !dropoffTime &&
              <h2
                className="action-label__title action-label__title--dropoff"
              >Select Dropoff Time</h2>
          }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  predictions: PropTypes.array.isRequired,
  dest: PropTypes.string,
  destName: PropTypes.string,
  startDate: PropTypes.string,
  pickupTime: PropTypes.string,
  endDate: PropTypes.string,
  dropoffTime: PropTypes.string,
  clearDest: PropTypes.func.isRequired,
  clearPickup: PropTypes.func.isRequired,
  clearDropoff: PropTypes.func.isRequired,
  cars: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
