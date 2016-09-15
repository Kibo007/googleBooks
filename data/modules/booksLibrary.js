'use strict';

import 'isomorphic-fetch';
import {bindActionCreators} from 'redux';
import {checkStatus, parseJSON, sortByName, sortByValueLargest} from '../../utils/utils';

//---------------------------------------------------------------------------------------------
//---------------------------- action type  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const BOOKS_FETCHED_SUCCESS = 'BOOKS_FETCHED_SUCCESS';
const BOOKS_LOADING = 'BOOKS_LOADING';
const BOOKS_LIST_VIEW = 'BOOKS_LIST_VIEW';
const BOOKS_UPDATE_SORTING = 'BOOKS_UPDATE_SORTING';
const BOOKS_UPDATE_SORTING_DIRECTION = 'BOOKS_UPDATE_SORTING_DIRECTION';
const BOOKS_UPDATE_SEARCH = 'BOOKS_UPDATE_SEARCH';

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

const changeListView = (payload) => {
  return {
    type: BOOKS_LIST_VIEW,
    payload
  };
};

const loading = (payload) => {
  return {
    type: BOOKS_LOADING,
    payload
  };
};

const updateBooksListSearch = (payload) => {
  return {
    type: BOOKS_UPDATE_SEARCH,
    payload
  };
};

const updateBooksListSorting = (payload) => {
  return {
    type: BOOKS_UPDATE_SORTING,
    payload
  };
};

const updateBooksListSortingDirection = (payload) => {
  return {
    type: BOOKS_UPDATE_SORTING_DIRECTION,
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
  totalItems: null,
  loading: false,
  listViewHorizontal: true,
  sortBy: 'title',
  sortDirection: 'az',
  searchBy: ''
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
    case BOOKS_LIST_VIEW:
      return {
        ...state,
        listViewHorizontal: action.payload
      };
    case BOOKS_UPDATE_SEARCH:
      return {
        ...state,
        searchBy: action.payload
      };
    case BOOKS_UPDATE_SORTING:
      return {
        ...state,
        sortBy: action.payload
      };
    case BOOKS_UPDATE_SORTING_DIRECTION:
      return {
        ...state,
        sortDirection: action.payload
      };

    default:
      return state;
  }
};

//---------------------------------------------------------------------------------------------
//---------------------------- selectors  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const mapStateToProps = state => {
  let {items, query, totalItems, loading, listViewHorizontal,
       sortBy, searchBy, sortDirection} = state.booksLibrary;

  return {
    query,
    pageNum: Math.ceil(totalItems / 10),
    loading,
    totalItems,
    listViewHorizontal,
    sortBy,
    searchBy,
    sortDirection,
    booksList: items
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- Action bind creators  --------------------------------------------
//---------------------------------------------------------------------------------------------
export const mapActionToDispatch = (dispatch) => {
  return bindActionCreators({
    fetchBooks,
    changeListView,
    updateBooksListSortingDirection,
    updateBooksListSorting,
    updateBooksListSearch
  }, dispatch)
};

