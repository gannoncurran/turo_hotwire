/* eslint-disable no-underscore-dangle, no-console */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  predictions: state.places.autocompleteData,
  dest: state.searchForm.dest,
  startDate: state.searchForm.startDate,
  pickupTime: state.searchForm.pickupTime,
  endDate: state.searchForm.endDate,
  dropoffTime: state.searchForm.dropoffTime,
});

const Header = ({
  predictions,
  dest,
  startDate,
  pickupTime,
  endDate,
  dropoffTime,
}) => (
  <header
    className={
      `header${predictions.length !== 0 || dest ? ' header--compact' : ''}`
    }
  >
    <div className="intro">
      <div className="car-icon"></div>
      <h1 className="hotwired">
        HOTWIRE<span className="hotwired__apostrophe">’</span>D
      </h1>
      <div className="welcome-wrapper">
        <p
          className="welcome-message"
        >
          Use the Hotwire rental car search engine to find rental cars fast.<br />
          Let’s get you into the driver’s seat and out on the road.
        </p>
      </div>
    </div>
    <div className="action-label">
      <h2 className="action-label__title">
        {!dest && 'Where To?'}
        {dest && !startDate && 'Pickup Date'}
        {dest && startDate && !pickupTime && 'Pickup Time'}
        {dest && startDate && pickupTime && !endDate && 'Dropoff Date'}
        {dest && startDate && pickupTime && endDate && !dropoffTime && 'Dropoff Time'}
        {dest && startDate && pickupTime && endDate && dropoffTime && 'OK, ready when you are.'}
      </h2>
    </div>
  </header>
);

Header.propTypes = {
  predictions: PropTypes.array.isRequired,
  dest: PropTypes.string,
  startDate: PropTypes.string,
  pickupTime: PropTypes.string,
  endDate: PropTypes.string,
  dropoffTime: PropTypes.string,
};

export default connect(mapStateToProps)(Header);
