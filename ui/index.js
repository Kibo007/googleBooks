import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history'
const history = useRouterHistory(createHashHistory)({ queryKey: false });

import BookLibrary from './containers/book-library/BookLibrary';
import BookDetails from './containers/book-details/BookDetails';
import NotFound from './containers/misc/NotFound';

import {store} from '../data/store/configureStore';

//import global styles and variables
import './styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={BookLibrary}/>
      <Route path="/book-details" component={BookDetails}/>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);