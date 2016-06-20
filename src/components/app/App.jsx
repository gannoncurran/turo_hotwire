import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import ReactHelmet from 'react-helmet';

// When appServer.js requires './src/routes' for react-router "match" clientside render,
// eventually the require tree will present these css and scss files, and
// everything will blow up — so, we'll only load these during webpack bundles.
// Webpack knows what to do with them.
if (process.env.IN_BUNDLE) {
  require('../../styles/normalize.css');
  require('../../styles/app.scss');
}

class App extends Component {
  componentDidMount() {
    // Remove original <link>ed styles from header to prevent conflicts with HMR compatible
    // <style>s that have now been injected by clientside webpack js bundle.
    if (process.env.NODE_ENV === 'development') {
      const linkedStyles = document.getElementsByTagName('link');
      const mainRegex = /\/main-.*\.css/;
      Array.prototype.map.call(
        linkedStyles,
        (link) => { if (mainRegex.test(link.href)) link.parentNode.removeChild(link) }
      );
    }
  }

  render() {
    return (
      <div className="container">
        <ReactHelmet
          title="Home"
          titleTemplate="Universal Starter - %s"
        />
        <div className="logo" />
        <h1 className="headline">App</h1>
        <nav className="nav">
          <Link className="nav__item" to={'/home'}>Home</Link>
          <Link className="nav__item" to={'/subpage'}>Subpage</Link>
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
