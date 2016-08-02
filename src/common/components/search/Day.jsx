import React, { PropTypes } from 'react';
import moment from 'moment';

const renderDay = day => (day > 0 ? day.toString() : '');

const determineNumberColor = (
  pickupDate,
  year,
  month,
  day
) => {
  const currentDate = moment().format('YYYY-MM-DD');
  const active = moment(`${year}-${month}-${day}`).isSameOrAfter(pickupDate || currentDate, 'day');
  return active ? '#000' : '#999';
};

const determineBgColor = (
  pickupDate,
  year,
  month,
  day
) => {
  const picked = moment(`${year}-${month}-${day}`).isSame(pickupDate, 'day');
  return picked ? 'orange' : 'white';
};

const Day = ({
    pickupDate,
    year,
    month,
    day,
}) => (
  <div
    style={{
      textAlign: 'center',
      padding: '8px 0 0',
      display: 'inline-block',
      color: determineNumberColor(
        pickupDate,
        year,
        month,
        day
      ),
      width: '40px',
      height: '40px',
      borderRadius: '20px',
      backgroundColor: determineBgColor(
        pickupDate,
        year,
        month,
        day
      ),
    }}
  >{renderDay(day)}</div>
);

Day.propTypes = {
  pickupDate: PropTypes.string,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

export default Day;
