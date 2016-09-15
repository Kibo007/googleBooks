import React from 'react';
import {createMarkup} from './../../../utils/utils';

import styles from './details-info.scss';

export const BuyButton =  (props) => props.buyLink ? <a className="btn btn-buy" href={props.buyLink}>Buy book</a> : null;

export const Categories = (props) => {
  return !_.isEmpty(props.categories) ? (
    <div className={styles.categories}>
      <h2>Categories:</h2>
      <ul data-layout="column" data-layout-align="space-between start">
        {_.map(props.categories, (category, i) => <li key={i}>{category}</li>)}
      </ul>
    </div>
  ) : null;
};

export const Description = (props) => {
  return !_.isEmpty(props.description) ? (
    <div className={styles.description}>
      <h2>Description:</h2>
      <ul data-layout="column" data-layout-align="space-between center">
        <li dangerouslySetInnerHTML={createMarkup(props.description)}></li>
      </ul>
    </div>
  ) : null;
};

export const BookInfo = (props) => {
  return (
    <div className={styles.bookDetails}>
      <h1>Book details</h1>
      <BookInfoDetails details={props.details}/>
    </div>
  )
};

export const BookInfoDetails = (props) => {
  let { title, subtitle, authors,
        publisher, publishedDate,
        price, buyLink} = props.details;
  return (
    <ul data-layout="column"
        data-layout-align="space-between start"
        className={styles.infoList}>
      <li>
        <b>Title:</b>{title}
      </li>
      {subtitle &&
      <li>
        <b>Subtitle:</b>{subtitle}
      </li>
      }
      <li>
        <b>Author:</b>{authors}
      </li>
      <li>
        <b>Publisher:</b>{publisher}
      </li>
      <li>
        <b>Published date:</b>{publishedDate}
      </li>
      {price &&
      <li className={styles.callToAction} data-layout="row" data-layout-align="space-between center">
        <div className="mr-m">
          <b>Price: </b>{price}
        </div>
        <BuyButton buyLink={buyLink}/>
      </li>
      }
    </ul>
  )
};