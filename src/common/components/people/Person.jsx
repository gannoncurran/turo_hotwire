import React, { PropTypes } from 'react';

const Person = ({
  id,
  firstName,
  lastName,
  email,
  counter,
  handleIncrement,
  handleDecrement,
}) => (
  <div style={{ borderBottom: '1px solid #ddd' }}>
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
  handleIncrement: PropTypes.func,
  handleDecrement: PropTypes.func,
};

export default Person;
