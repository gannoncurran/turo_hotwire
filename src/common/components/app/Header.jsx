/* eslint-disable no-underscore-dangle, no-console */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as searchFormActions from '../../actions/searchForm';
import moment from 'moment'

const mapStateToProps = state => ({
  predictions: state.places.autocompleteData,
  dest: state.searchForm.dest,
  destName: state.searchForm.destName,
  startDate: state.searchForm.startDate,
  pickupTime: state.searchForm.pickupTime,
  endDate: state.searchForm.endDate,
  dropoffTime: state.searchForm.dropoffTime,
});

const mapDispatchToProps = (dispatch) => ({
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
        <div className="summary">
          {dest &&
            <div className="summary__item">
              <p className="summary__title">Location:</p>
              <p className="summary__text">{destName}</p>
              <a
                href="#"
                onClick={clearDest}
                className="summary__delete-link"
              ><span className="icon icon-delete"></span></a>
            </div>
          }
          {(startDate || pickupTime) &&
            <div className="summary__item">
              <p className="summary__title">Pick Up:</p>
              <p className="summary__text">
                {moment(startDate, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
                {pickupTime ? ` at ${moment(`2016-01-01 ${pickupTime}`, 'YYYY-MM-DD HH:mm').format('h:mm a')}` : ''}
              </p>
              <a
                href="#"
                onClick={clearPickup}
                className="summary__delete-link"
              ><span className="icon icon-delete"></span></a>
            </div>
          }
          {(endDate || dropoffTime) &&
            <div className="summary__item">
              <p className="summary__title">Drop Off:</p>
              <p className="summary__text">
                {moment(endDate, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
                {dropoffTime ? ` at ${moment(`2016-01-01 ${dropoffTime}`, 'YYYY-MM-DD HH:mm').format('h:mm a')}` : ''}
              </p>
              <a
                href="#"
                onClick={clearDropoff}
                className="summary__delete-link"
              ><span className="icon icon-delete"></span></a>
            </div>
          }
        </div>
        <div className="action-label">
          <h2 className="action-label__title">
            {
              !dest &&
              'Where To?'
            }
            {
              dest &&
              !startDate &&
              'Select Pickup Date'
            }
            {
              dest &&
              startDate &&
              !pickupTime &&
              'Select Pickup Time'
            }
            {
              dest &&
              startDate &&
              pickupTime &&
              !endDate &&
              'Select Dropoff Date'
            }
            {
              dest &&
              startDate &&
              pickupTime &&
              endDate &&
              !dropoffTime &&
              'Select Dropoff Time'
            }
            {
              dest &&
              startDate &&
              pickupTime &&
              endDate &&
              dropoffTime &&
              'OK, ready when you are.'
            }
          </h2>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
