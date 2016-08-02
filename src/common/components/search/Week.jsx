import React, { PropTypes } from 'react';

import Day from './Day';

const Week = ({
    pickupDate,
    year,
    month,
    days,
    setStartDate,
    setEndDate,
}) => (
  <div
    style={{

    }}
  >
   {
    days.map((day, i) => (
      <Day
        key={i}
        pickupDate={pickupDate}
        year={year}
        month={month}
        day={day}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
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
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};

export default Week;
