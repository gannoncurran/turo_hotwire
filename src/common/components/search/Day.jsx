import React, { PropTypes } from 'react';
import moment from 'moment';

const renderDay = day => (day > 0 ? day.toString() : '');

const selectable = (
  pickupDate,
  year,
  month,
  day
) => {
  const dayMoment = moment({
    year,
    month: month - 1, // parser treats months as 0 indexed
    day,
  });

  if (pickupDate) {
    const pdSegments = pickupDate.split('-');
    const pickUpMoment = moment({
      year: pdSegments[0],
      month: pdSegments[1] - 1, // parser treats months as 0 indexed
      day: pdSegments[2],
    });
    return dayMoment.isAfter(pickUpMoment, 'day');
  }
  const currentMoment = moment();
  return dayMoment.isSameOrAfter(currentMoment, 'day');
};

const dayMatchesPickup = (
  pickupDate,
  year,
  month,
  day
) => {
  const dayMoment = moment({
    year,
    month: month - 1, // parser treats months as 0 indexed
    day,
  });
  const pdSegments = pickupDate.split('-');
  const pickUpMoment = moment({
    year: pdSegments[0],
    month: pdSegments[1] - 1, // parser treats months as 0 indexed
    day: pdSegments[2],
  });
  return dayMoment.isSame(pickUpMoment, 'day');
};

const Day = ({
    pickupDate,
    year,
    month,
    day,
    setDate,
}) => {
  const active = selectable(
    pickupDate,
    year,
    month,
    day
  );
  const puSet = pickupDate && dayMatchesPickup(
    pickupDate,
    year,
    month,
    day
  );
  return (
    <div
      className="day"
    >
      {day > 0 &&
        <p
          onClick={active ? setDate(`${year}-${month}-${day}`) : (n => n)}
          className={
            `day__number${active
              ? ' day__number--active'
              : ''}${puSet
              ? ' day__number--puSet'
              : ''}${(!puSet && active && pickupDate)
              ? ' day__number--drop-off'
              : ''}`
          }
        >{renderDay(day)}</p>
      }
    </div>
  );
};

Day.propTypes = {
  pickupDate: PropTypes.string,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  setDate: PropTypes.func.isRequired,
};

export default Day;
