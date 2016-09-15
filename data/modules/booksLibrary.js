'use strict';

import 'isomorphic-fetch';
import {bindActionCreators} from 'redux';
import {checkStatus, parseJSON, sortByName, sortByValueLargest} from '../../utils/utils';

//---------------------------------------------------------------------------------------------
//---------------------------- action type  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const BOOKS_FETCHED_SUCCESS = 'BOOKS_FETCHED_SUCCESS';
const BOOKS_LOADING = 'BOOKS_LOADING';

//---------------------------------------------------------------------------------------------
//---------------------------- action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const booksFetched = (payload, query) => (dispatch) => {
  dispatch({
    type: BOOKS_FETCHED_SUCCESS,
    payload,
    query
  });
  dispatch(loading(false));
};

const loading = (payload) => {
  return {
    type: BOOKS_LOADING,
    payload
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- async action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const fetchBooks = (query, startIndex = 0) => {

  return dispatch => {
    dispatch(loading(true));
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&startIndex=${startIndex}&printType=books&orderBy=newest&maxResults=10`)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(booksFetched(json, query)))
      .catch(error => {
        console.log(error)
        //TODO make error handling to
      });
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- reducer  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const initialState = {
  items: [],
  query: null,
  totalItems: 0,
  loading: false
};

// reducer
export const booksLibrary = (state = initialState, action = {}) => {

  switch (action.type) {

    case BOOKS_FETCHED_SUCCESS:
      return {
        ...state,
        ...action.payload,
        query: action.query,
        loading: action.payload
      };
    case BOOKS_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

//---------------------------------------------------------------------------------------------
//---------------------------- selectors  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const mapStateToProps = state => {
  let {items, query, totalItems, loading} = state.booksLibrary;
  return {
    booksList: items,
    query,
    pageNum: Math.ceil(totalItems / 10),
    loading
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- Action bind creators  --------------------------------------------
//---------------------------------------------------------------------------------------------
export const mapActionToDispatch = (dispatch) => {
  return bindActionCreators({
    fetchBooks
  }, dispatch)
};

