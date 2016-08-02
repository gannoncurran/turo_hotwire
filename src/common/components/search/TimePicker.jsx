import React, { PropTypes } from 'react';

const TimePicker = ({
    setTime,
}) => (
  <div
    style={{

    }}
  >
    <h3>AM</h3>
    <div>
      <button
        onClick={setTime('00:00')}
      >Midnight</button>
      <button
        onClick={setTime('00:30')}
      >12:30 am</button>
    </div>
    <h3>PM</h3>
    <div>
      <button
        onClick={setTime('12:00')}
      >Noon</button>
      <button
        onClick={setTime('12:30')}
      >12:30 pm</button>
    </div>
  </div>
);

TimePicker.propTypes = {
  setTime: PropTypes.func.isRequired,
};

export default TimePicker;
