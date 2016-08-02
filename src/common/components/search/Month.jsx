import React, { PropTypes } from 'react';

import Week from './Week';

const Month = ({
    pickupDate,
    year,
    month,
    weeks,
}) => (
  <div
    style={{
    }}
  >
   {
    weeks.map((week) => (
      <Week
        pickupDate={pickupDate}
        year={year}
        month={month}
        days={week}
      />
    ))
   }
  </div>
);

Month.propTypes = {
  pickupDate: PropTypes.string,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  weeks: PropTypes.array.isRequired,
};

export default Month;
