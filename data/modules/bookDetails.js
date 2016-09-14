'use strict';

import 'isomorphic-fetch';
import {bindActionCreators} from 'redux';
import {checkStatus, parseJSON, sortByName, sortByValueLargest} from '../../utils/utils';


//---------------------------------------------------------------------------------------------
//---------------------------- action type  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const BOOK_DETAILS_FETCHED_SUCCESS = 'BOOK_DETAILS_FETCHED_SUCCESS';


//---------------------------------------------------------------------------------------------
//---------------------------- action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const bookDetailsFetched = (payload) => {
  return {
    type: BOOK_DETAILS_FETCHED_SUCCESS,
    payload
  };
};


//---------------------------------------------------------------------------------------------
//---------------------------- async action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const fetchBookDetails = (bookUrl) => {
  return dispatch => {

    return fetch(bookUrl)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(bookDetailsFetched(json)))
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
  volumeInfo: null
};

// reducer
export const bookDetails = (state = initialState, action = {}) => {

  switch (action.type) {

    case BOOK_DETAILS_FETCHED_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

//---------------------------------------------------------------------------------------------
//---------------------------- selectors  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const mapStateToProps = state => {
  let {volumeInfo, saleInfo, accessInfo} = state.bookDetails;
  let image, title, subtitle, author, publisher, published, categories, description, price, pdfLink, buyLink;
  if (!_.isEmpty(volumeInfo)) {
    image = volumeInfo.imageLinks.medium;
    title = volumeInfo.title;
    subtitle = volumeInfo.subtitle;
    author = volumeInfo.authors[0];
    publisher = volumeInfo.publisher;
    published = volumeInfo.publishedDate;
    categories = volumeInfo.categories;
    description = volumeInfo.description;
    price = `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`;
    pdfLink = accessInfo.pdf.acsTokenLink;
    buyLink = saleInfo.buyLink;
  }
  return {
    image,
    title,
    subtitle,
    author,
    publisher,
    published,
    categories,
    description,
    price,
    pdfLink,
    buyLink
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- Action bind creators  --------------------------------------------
//---------------------------------------------------------------------------------------------
export const mapActionToDispatch = (dispatch) => {
  return bindActionCreators({
    fetchBookDetails
  }, dispatch)
};

