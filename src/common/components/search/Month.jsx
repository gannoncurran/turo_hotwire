import React, { PropTypes } from 'react';
import moment from 'moment';

import Week from './Week';

const Month = ({
    pickupDate,
    year,
    month,
    weeks,
    setDate,
}) => (
  <div
    className="month"
  >
    <h3
      className="month__title"
    >
      {moment({ year, month: month - 1 }).format('MMMM')}
      <span className="month__year">
        {moment({ year, month: month - 1 }).format('YYYY')}
      </span>
    </h3>
    <div
      className="month__day-names"
    >
      <p
        className="month__day"
      >Sun</p>
      <p
        className="month__day"
      >Mon</p>
      <p
        className="month__day"
      >Tue</p>
      <p
        className="month__day"
      >Wed</p>
      <p
        className="month__day"
      >Thu</p>
      <p
        className="month__day"
      >Fri</p>
      <p
        className="month__day"
      >Sat</p>
    </div>
   {
    weeks.map((week, i) => (
      <Week
        key={i}
        pickupDate={pickupDate}
        year={year}
        month={month}
        days={week}
        setDate={setDate}
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
  setDate: PropTypes.func.isRequired,
};

export default Month;
