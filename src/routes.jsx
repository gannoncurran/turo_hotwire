import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Subpage from './components/Subpage';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="subpage" component={Subpage} />
    <Route path="*" component={NotFound} />
  </Route>
);
