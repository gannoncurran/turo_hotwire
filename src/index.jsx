import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import withScroll from 'scroll-behavior';
const history = withScroll(browserHistory);

import App from './components/App';
import Home from './components/Home';
import Subpage from './components/Subpage';
import NotFound from './components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="subpage" component={Subpage} />
    <Route path="*" component={NotFound} />
  </Route>
);

ReactDOM.render(
  <Router
    history={history}
    routes={routes}
  />, document.getElementById('react-render-target')
);
