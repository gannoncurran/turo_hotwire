/* eslint-disable no-underscore-dangle, no-console */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  predictions: state.places.autocompleteData,
  dest: state.searchForm.dest,
});

const Header = ({ predictions, dest }) => (
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
      <h2 className="action-label__title">Where To?</h2>
    </div>
  </header>
);

Header.propTypes = {
  dest: PropTypes.string,
  predictions: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Header);
