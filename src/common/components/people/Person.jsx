import React, { PropTypes } from 'react';

const Person = ({
  id,
  firstName,
  lastName,
  email,
  counter,
  handleIncrement,
  handleDecrement,
  isUpdating,
}) => (
  <div
    style={{
      borderBottom: '1px solid #ddd',
    }}
    className={isUpdating ? 'updating' : 'synced'}
  >
    <p>{firstName} {lastName}</p>
    <p>Email: {email}</p>
    <p>
      Counter: {counter}&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={handleIncrement(id)}>+</button>
      <button onClick={handleDecrement(id)}>-</button>
    </p>
  </div>
);

Person.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
};

export default Person;
