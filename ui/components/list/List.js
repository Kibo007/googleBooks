import React, {Component} from 'react';
import styles from './list.scss';

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
      <ul data-layout="column" data-layout-align="space-between start" className={styles.list}>
        {
          _.map(booksList, (book, i) => {
            let {imageLinks, title, authors, publishedDate, subtitle} = book.volumeInfo;

            return (
              <li key={i} data-layout="row"
                  data-layout-align="space-between center"
                  className={styles.listItem}
                  onClick={() => this.props.handleRoutingToDetailsPage(book.selfLink)}>
                <img src={imageLinks && imageLinks.smallThumbnail} alt={book.searchInfo && book.searchInfo.textSnippet}/>
                <span>Title: {title}</span>
                {subtitle && <span>Subtitle: {subtitle}</span>}
                <span>Author: {authors}</span>
                <span>Published date: {publishedDate}</span>
              </li>
            )
          })
        }
      </ul>
    );
  }
}