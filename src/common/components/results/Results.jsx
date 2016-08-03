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
  <div
    className="results"
  >
    <ReactHelmet title="Results" />
    {cars.isLoading &&
      <p
        className="results__loading"
      >Loading…</p>
    }
    {!cars.isLoading &&
      cars.data.map((car) => {
        const { type, imgUrl, desc } = metaData[car.CarTypeCode];
        return (
          <a
            className="results__item"
            href={car.DeepLink}
            key={car.HWRefNumber}
          >
            <img
              className="results__image"
              src={imgUrl}
              alt="desc"
            />
            <div className="results__details">
              <p
                className="results__type"
              >{type}</p>
              <p
                className="results__desc"
              >{desc}</p>
              <p
                className="results__mileage"
              >{car.MileageDescription} miles</p>
              <p
                className="results__loc-desc"
              >{car.LocationDescription}</p>
              <p
                className="results__price"
              >
                <span className="results__currency-symbol">
                  {currencySymbols[car.CurrencyCode] || ''}
                </span>
                {
                  car.TotalPrice
                }{
                  currencySymbols[car.CurrencyCode] ? '' : ` (${car.CurrencyCode})`
                }
              </p>
              <p
                className="results__fee-note"
              >Price includes<br />taxes and fees</p>
            </div>
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
