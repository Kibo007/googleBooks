import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { booksLibrary } from '../modules/booksLibrary';
import { bookDetails } from '../modules/bookDetails';

const logger = createLogger({collapsed:true});
const rootReducer = combineReducers(
  {
    booksLibrary,
    bookDetails,
    routing: routerReducer
  }
);

const initialState = {};

export default function configureStore() {
  let store;

  if(module.hot){
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  }else{
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware), f=>f
    ));
  }

  return store;
}

export const store = configureStore();
