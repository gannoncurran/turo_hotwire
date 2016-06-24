import React, { PropTypes } from 'react';

const InlineCounter = ({
  counterValue,
}) => (
  <form>
    <p>
      <input type="text" name="counter" defaultValue={counterValue} />
      <input type="submit" value="Update" />
    </p>
  </form>
);

InlineCounter.propTypes = {
  counterValue: PropTypes.number.isRequired,
};

export default InlineCounter;
