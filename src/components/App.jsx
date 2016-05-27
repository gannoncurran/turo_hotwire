import React, { // eslint-disable-line no-unused-vars
  PropTypes,
} from 'react';

const App = ({
  children,
}) => (
  { children }
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
