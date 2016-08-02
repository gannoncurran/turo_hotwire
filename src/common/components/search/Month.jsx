import React, { PropTypes } from 'react';
import moment from 'moment';

import Week from './Week';

const Month = ({
    pickupDate,
    year,
    month,
    weeks,
}) => (
  <div
    style={{
      marginBottom: '40px',
    }}
  >
    <h3>{moment(`${year}-${month}`).format('MMMM YYYY')}</h3>
   {
    weeks.map((week, i) => (
      <Week
        key={i}
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
