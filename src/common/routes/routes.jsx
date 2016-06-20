import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app/App';
import Home from '../components/home/Home';
import Subpage from '../components/subpage/Subpage';
import NotFound from '../components/notfound/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="subpage" component={Subpage} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
