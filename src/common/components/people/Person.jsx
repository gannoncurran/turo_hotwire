import React, { PropTypes } from 'react';

const Person = ({
  firstName,
  lastName,
  email,
  counter,
}) => (
  <div style={{ borderBottom: '1px solid #ddd' }}>
    <p>{firstName} {lastName}</p>
    <p>Email: {email}</p>
    <p>Counter: {counter}</p>
  </div>
);

Person.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  counter: PropTypes.string.isRequired,
};

export default Person;
