import React, { PropTypes } from 'react';

import Day from './Day';

const Week = ({
    pickupDate,
    year,
    month,
    days,
}) => (
  <div
    style={{

    }}
  >
   {
    days.map((day) => (
      <Day
        pickupDate={pickupDate}
        year={year}
        month={month}
        day={day}
      />
    ))
   }
  </div>
);

Week.propTypes = {
  pickupDate: PropTypes.string,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  days: PropTypes.array.isRequired,
};

export default Week;
