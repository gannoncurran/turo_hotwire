import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import ReactHelmet from 'react-helmet';
import { carsSearch } from '../../actions/cars';
import { connect } from 'react-redux';

import metaData from '../../helpers/metaData.json';
import currencySymbols from '../../helpers/currencySymbols.json';

const redial = {
  fetch: ({ dispatch, params }) => dispatch(carsSearch(params.searchQuery)),
};

const mapStateToProps = state => ({
  cars: state.cars,
});

const Results = ({
  cars,
}) => (
  <div>
    <ReactHelmet title="Results" />
    {cars.error &&
      <div>
        <p>{cars.errorMessage}</p>
      </div>
    }
    {cars.isLoading &&
      <p>Loading…</p>
    }
    {!cars.isLoading &&
      cars.data.map((car) => {
        const { type, imgUrl, desc } = metaData[car.CarTypeCode];
        return (
          <a
            href={car.DeepLink}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: '#000',
              borderBottom: '1px solid #666',
            }}
            key={car.HWRefNumber}
          >
            <img src={imgUrl} alt="desc" />
            <p>{type}</p>
            <p>{desc}</p>
            <p>{car.MileageDescription} miles</p>
            <p>{car.LocationDescription}</p>
            <p>{
                currencySymbols[car.CurrencyCode] || ''
              }{
                car.TotalPrice
              }{
                currencySymbols[car.CurrencyCode] ? '' : ` (${car.CurrencyCode})`
              }</p>
          </a>
        );
      })
    }
  </div>
);

Results.propTypes = {
  cars: PropTypes.object.isRequired,
};

export default provideHooks(redial)(connect(mapStateToProps)(Results));
