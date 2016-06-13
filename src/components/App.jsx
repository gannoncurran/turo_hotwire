import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../styles/normalize.css';
import '../styles/app.scss';

const App = ({
  children,
}) => (
  <div className="container">
    <div className="logo" />
    <h1 className="headline">App</h1>
    <nav className="nav">
      <Link className="nav__item" to={'/home'}>Home</Link>
      <Link className="nav__item" to={'/subpage'}>Subpage</Link>
    </nav>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
