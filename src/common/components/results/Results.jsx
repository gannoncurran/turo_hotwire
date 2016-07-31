import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import ReactHelmet from 'react-helmet';
import { carsSearch } from '../../actions/cars';
import { connect } from 'react-redux';

const redial = {
  fetch: ({ dispatch, params }) => dispatch(carsSearch(params.searchQuery)),
};

const mapStateToProps = state => ({
  cars: state.cars.data.Result || [],
  metaData: state.cars.data.MetaData || [],
});

const Results = ({
  cars,
  metaData,
}) => (
  <div>
    <ReactHelmet title="Results" />
    <div className="subhead">Results</div>
    <p>{JSON.stringify(cars)}</p>
    <p>{JSON.stringify(metaData)}</p>
  </div>
);

Results.propTypes = {
  cars: PropTypes.array.isRequired,
  metaData: PropTypes.array.isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(Results));
