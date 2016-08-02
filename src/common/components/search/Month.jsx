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
    style={{
      marginBottom: '40px',
    }}
  >
    <h3>{moment(`${year}-${month}`, 'YYYY-MM').format('MMMM YYYY')}</h3>
    <div
      style={{
        fontSize: '10px',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
      }}
    >
      <p
        style={{
          width: '50px',
          textAlign: 'center',
        }}
      >Sun</p>
      <p
        style={{
          width: '50px',
          textAlign: 'center',
        }}
      >Mon</p>
      <p
        style={{
          width: '50px',
          textAlign: 'center',
        }}
      >Tue</p>
      <p
        style={{
          width: '50px',
          textAlign: 'center',
        }}
      >Wed</p>
      <p
        style={{
          width: '50px',
          textAlign: 'center',
        }}
      >Thu</p>
      <p
        style={{
          width: '50px',
          textAlign: 'center',
        }}
      >Fri</p>
      <p
        style={{
          width: '50px',
          textAlign: 'center',
        }}
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
