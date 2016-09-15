import React, {Component} from 'react';
import styles from './list.scss';
import {BookInfoDetails} from './../details-info/DetailsInfo';

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
  }

  render() {
    let {booksList} = this.props;


    return (
      <ul data-layout="column" data-layout-align=" center" className={styles.list}>
        {
          _.map(booksList, (book, i) => {
            let {imageLinks} = book.volumeInfo;
            return (
              <li key={i} data-layout="row" data-layout-align="start center"
                  className={styles.listItem}
                  onClick={() => this.props.handleRoutingToDetailsPage(book.selfLink)}>
                <img src={imageLinks && imageLinks.smallThumbnail}
                     alt={book.searchInfo && book.searchInfo.textSnippet}/>
                <BookInfoDetails details={{...book.volumeInfo}}/>
              </li>
            )
          })
        }
      </ul>
    );
  }
}