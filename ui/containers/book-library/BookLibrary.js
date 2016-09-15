import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {mapStateToProps, mapActionToDispatch} from '../../../data/modules/booksLibrary';

import Search from './../../components/search/Search';
import List from './../../components/list/List';
import Pagination from './../../components/pagination/Pagination';

import styles from './bookLibrary.scss';

class BookLibrary extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleRoutingToDetailsPage = (url) => {
    localStorage.setItem('bookUrl', url);
    this.context.router.push('/book-details');
  };

  render() {
    let {
      fetchBooks,
      booksList,
      query,
      pageNum
    } = this.props;
    
    return (
      <div>
        <div className={styles.searchWrapper}>
          <Search fetchBooks={fetchBooks} />
        </div>

        <List booksList={booksList}
              handleRoutingToDetailsPage={this.handleRoutingToDetailsPage}/>
        <Pagination query={query}
                    fetchBooks={fetchBooks}
                    pageNum={pageNum}/>
      </div>
    );
  }
}

BookLibrary.propTypes = {
  location: PropTypes.object
};

BookLibrary.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionToDispatch
)(BookLibrary);
