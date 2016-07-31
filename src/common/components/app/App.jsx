/* eslint-disable global-require */
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import ReactHelmet from 'react-helmet';

// When appServer.js requires './src/routes' for react-router "match" server-side render,
// eventually the require tree will present these css and scss files, and
// node will blow up — so, we'll only load these during webpack bundles.
// Webpack knows what to do with them.
if (process.env.IN_BUNDLE) {
  require('../../styles/normalize.css');
  require('../../styles/app.scss');
}

class App extends Component {
  componentDidMount() {
    // Remove original <link>ed styles from header while in development mode
    // to prevent conflicts with HMR compatible <style>s that have now been
    // injected by clientside webpack js bundle.
    if (process.env.NODE_ENV === 'development') {
      const linkedStyles = document.getElementsByTagName('link');
      const mainRegex = /\/main-.*\.css/;
      Array.prototype.map.call(
        linkedStyles,
        (link) => { if (mainRegex.test(link.href)) link.parentNode.removeChild(link); }
      );
    }
  }

  render() {
    return (
      <div className="container">
        <ReactHelmet
          title="Search for Rental Cars"
          titleTemplate="Hotwire’d | %s"
          meta={[
            {
              charset: 'utf-8',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
            {
              property: 'og:title',
              content: 'Turo Code Challenge: Hotwire API Wrapper',
            },
            {
              property: 'og:description',
              content: 'Search for rental cars with the HotWire API',
            },
          ]}
        />
        <h1 className="headline playfair">HOTWIRE’D</h1>
        <nav className="nav">
          <Link className="nav__item" to={'/search'}>Search</Link>
          <Link className="nav__item" to={'/about'}>About</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
