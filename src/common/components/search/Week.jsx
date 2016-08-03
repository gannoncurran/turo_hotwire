import React, { PropTypes } from 'react';

import Day from './Day';

const Week = ({
    pickupDate,
    year,
    month,
    days,
    setDate,
}) => (
  <div
    className="week"
  >
   {
    days.map((day, i) => (
      <Day
        key={i}
        pickupDate={pickupDate}
        year={year}
        month={month}
        day={day}
        setDate={setDate}
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
  setDate: PropTypes.func.isRequired,
};

export default Week;
