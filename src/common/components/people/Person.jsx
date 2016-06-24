import React, { PropTypes } from 'react';
import InlineCounter from './InlineCounter';

const Person = ({
  firstName,
  lastName,
  email,
  counter,
}) => (
  <div style={{ borderBottom: '1px solid #ddd' }}>
    <p>{firstName} {lastName}</p>
    <p>Email: {email}</p>
    <InlineCounter counterValue={counter} />
  </div>
);

Person.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
};

export default Person;
