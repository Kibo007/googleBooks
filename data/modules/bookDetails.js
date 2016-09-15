'use strict';

import 'isomorphic-fetch';
import {bindActionCreators} from 'redux';
import {checkStatus, parseJSON} from '../../utils/utils';


//---------------------------------------------------------------------------------------------
//---------------------------- action type  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const BOOK_DETAILS_FETCHED_SUCCESS = 'BOOK_DETAILS_FETCHED_SUCCESS';
const BOOK_DETAILS_REMOVE = 'BOOK_DETAILS_REMOVE';

//---------------------------------------------------------------------------------------------
//---------------------------- action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const bookDetailsFetched = (payload) => {
  return {
    type: BOOK_DETAILS_FETCHED_SUCCESS,
    payload
  };
};

const bookDetailsRemove = (payload) => {
  return {
    type: BOOK_DETAILS_REMOVE,
    payload
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- async action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const fetchBookDetails = (bookUrl) => {
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

const initialState = {
  volumeInfo: null,
  saleInfo: null,
  accessInfo: null
};

// reducer
export const bookDetails = (state = initialState, action = {}) => {

  switch (action.type) {

    case BOOK_DETAILS_FETCHED_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case BOOK_DETAILS_REMOVE:
      return {
        ...initialState
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

  let image, title, subtitle, authors,
      publisher, publishedDate, categories,
      description, price, pdfLink, buyLink;

  if (!_.isEmpty(volumeInfo)) {
    let imageLinks = volumeInfo.imageLinks;

    image = imageLinks.medium ? imageLinks.medium : imageLinks.smallThumbnail;
    title = volumeInfo.title;
    subtitle = volumeInfo.subtitle ? volumeInfo.subtitle : null;
    authors = volumeInfo.authors;
    publisher = volumeInfo.publisher;
    publishedDate = volumeInfo.publishedDate;
    categories = volumeInfo.categories;
    description = volumeInfo.description;

    price = saleInfo.saleability !== 'NOT_FOR_SALE' ?
      `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` :
      'Not for sale!';

    pdfLink = accessInfo.pdf.acsTokenLink;
    buyLink = saleInfo.buyLink;
  }

  return {
    image,
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
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
    fetchBookDetails,
    bookDetailsRemove
  }, dispatch)
};

