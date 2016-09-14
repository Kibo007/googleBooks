'use strict';

import 'isomorphic-fetch';
import {bindActionCreators} from 'redux';
import {checkStatus, parseJSON, sortByName, sortByValueLargest} from '../../utils/utils';


//---------------------------------------------------------------------------------------------
//---------------------------- action type  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const APPS_SUCCESS = 'APPS_SUCCESS';


//---------------------------------------------------------------------------------------------
//---------------------------- action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const booksFetched = (payload) => {
  return {
    type: APPS_SUCCESS,
    payload
  };
};


//---------------------------------------------------------------------------------------------
//---------------------------- async action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const fetchBooks = (query) => {
  return dispatch => {

    return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&printType=books&orderBy=newest&maxResults=2`)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(booksFetched(json)))
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
  
};

// reducer
export const books = (state = initialState, action = {}) => {

  switch (action.type) {

    case APPS_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
}

//---------------------------------------------------------------------------------------------
//---------------------------- selector  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const mapStateToProps = state => {
 
  return {
   booksList: state.books.items
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- Action bind creator  --------------------------------------------
//---------------------------------------------------------------------------------------------
export const mapActionToDispatch = (dispatch) => {
  return bindActionCreators({
    fetchBooks
  }, dispatch)
};

