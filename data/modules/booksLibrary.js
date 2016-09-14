'use strict';

import 'isomorphic-fetch';
import {bindActionCreators} from 'redux';
import {checkStatus, parseJSON, sortByName, sortByValueLargest} from '../../utils/utils';

//---------------------------------------------------------------------------------------------
//---------------------------- action type  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const BOOKS_FETCHED_SUCCESS = 'BOOKS_FETCHED_SUCCESS';
export const BOOK_DETAILS_FETCHED_SUCCESS = 'BOOK_DETAILS_FETCHED_SUCCESS';


//---------------------------------------------------------------------------------------------
//---------------------------- action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const booksFetched = (payload, query) => {
  return {
    type: BOOKS_FETCHED_SUCCESS,
    payload,
    query
  };
};


//---------------------------------------------------------------------------------------------
//---------------------------- async action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const fetchBooks = (query, startIndex = 0,) => {
  return dispatch => {

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

let initialState = {
  items: [],
  query: '',
  totalItems: 0
};

// reducer
export const booksLibrary = (state = initialState, action = {}) => {

  switch (action.type) {

    case BOOKS_FETCHED_SUCCESS:
      return {
        ...state,
        ...action.payload,
        query: action.query
      };

    default:
      return state;
  }
};

//---------------------------------------------------------------------------------------------
//---------------------------- selectors  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const mapStateToProps = state => {
  let {items, query, totalItems} = state.booksLibrary;
  return {
    booksList: items,
    query,
    pageNum: Math.ceil(totalItems / 10)
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

