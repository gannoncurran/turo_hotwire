import React, { PropTypes } from 'react';

import moment from 'moment';
import { Calendar } from 'calendar';
const calendar = new Calendar;

import Month from './Month';

const makeMonths = (startMoment, quantity) => {
  const months = [];
  for (let i = 0; i < quantity; i++) {
    const date = moment(startMoment)
      .add(i, 'months')
      .format('YYYY-MM-DD')
      .split('-');
    const year = Number(date[0]);
    const mo = Number(date[1] - 1);
    const month = {};
    month.year = year;
    month.month = mo + 1;
    month.weeks = calendar.monthDays(year, mo);
    months.push(month);
  }
  return months;
};

const generateMonths = (pickupDate) => {
  if (pickupDate) {
    const pickup = moment(pickupDate);
    const calLength = 11 + moment().diff(pickup, 'months');
    return makeMonths(pickup, calLength);
  }
  return makeMonths(moment(), 11);
};

const Cal = ({
    pickupDate,
    setStartDate,
    setEndDate,
}) => (
  <div
    style={{
    }}
  >
    {
      generateMonths(pickupDate).map((month, i) => (
        <Month
          key={i}
          pickupDate={pickupDate}
          year={month.year}
          month={month.month}
          weeks={month.weeks}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      ))
    }
  </div>
);

Cal.propTypes = {
  pickupDate: PropTypes.string,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};

export default Cal;
