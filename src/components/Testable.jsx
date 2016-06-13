// Here just as an example for testing setup. Remove it.

import React, { PropTypes } from 'react';

const Testable = ({
  name,
  value,
}) => (
  <div>
    <h1>Test Me</h1>
    <p>Name: {`${name}`}</p>
    <p>Value: {`${value}`}</p>
  </div>
);

Testable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Testable;
