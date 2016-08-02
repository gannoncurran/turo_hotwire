/* eslint-disable global-require */
import React, { PropTypes, Component } from 'react';
import ReactHelmet from 'react-helmet';
import Header from './Header';
import throttle from 'lodash.throttle';
// When appServer.js requires './src/routes' for react-router "match" server-side render,
// eventually the require tree will present these css and scss files, and
// node will blow up — so, we'll only load these during webpack bundles.
// Webpack knows what to do with them.
if (process.env.IN_BUNDLE) {
  require('../../styles/normalize.css');
  require('../../styles/app.scss');
}

let resizeTimeout;
let handleResize;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true,
    };
  }

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

    handleResize = throttle(() => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      this.setState({ animate: false });
      resizeTimeout = setTimeout(() => {
        this.setState({ animate: true });
      }, 350);
    }, 250);

    const w = window;
    w.addEventListener('resize', handleResize);
  }

  componentWillUnmount() {
    const w = window;
    w.removeEventListener('resize', handleResize);
  }

  render() {
    return (
      <div className={`container${this.state.animate ? '' : ' container--no-anim'}`}>
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
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
