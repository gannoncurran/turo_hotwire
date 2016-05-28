import React, {
  PropTypes,
} from 'react';

import '../styles/normalize.css';
import '../styles/app.scss';

const App = ({
  children,
}) => (
  <div className="container">
    <h1 className="headline">App</h1>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
