import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {mapStateToProps, mapActionToDispatch} from '../../../data/modules/booksLibrary';

import Search from './../../components/search/Search';
import List from './../../components/list/List';
import Pagination from './../../components/pagination/Pagination';
import Loading from './../../components/loading/Loading';

import styles from './bookLibrary.scss';

class BookLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewHorizontal: true
    }
  }

  componentDidMount() {
  }

  handleRoutingToDetailsPage = (url) => {
    localStorage.setItem('bookUrl', url);
    this.context.router.push('/book-details');
  };

  handleListView = () => {
    this.setState({listViewHorizontal: !this.state.listViewHorizontal })
  };

  render() {
    let {
      fetchBooks,
      booksList,
      query,
      pageNum,
      loading,
      totalItems
    } = this.props;

    let isPaginationVisible = query && totalItems > 0;
    let noResults = totalItems === 0;

    return (
      <div>
        <div className={styles.searchWrapper}>
          <Search fetchBooks={fetchBooks} />
        </div>

        <div onClick={this.handleListView}>toggle list view</div>

        {!loading &&
          <List booksList={booksList}
                handleRoutingToDetailsPage={this.handleRoutingToDetailsPage}
                listViewHorizontal={this.state.listViewHorizontal}/>
        }

        {loading && <Loading />}

        {!query &&
        <h2 className="center-text">Give it try and search for book!</h2>
        }

        {noResults && <h2 className="center-text">no results for {query}</h2>}

        {isPaginationVisible &&
          <Pagination query={query}
                      fetchBooks={fetchBooks}
                      pageNum={pageNum}/>
        }

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
