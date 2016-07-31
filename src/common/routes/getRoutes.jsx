import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app/App';
import Search from '../components/search/Search';
import Results from '../components/results/Results';
import About from '../components/about/About';
import NotFound from '../components/notfound/NotFound';

const getRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Search} />
    <Route path="search/:searchQuery" component={Results} />
    <Route path="search" component={Search} />
    <Route path="about" component={About} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default getRoutes;
