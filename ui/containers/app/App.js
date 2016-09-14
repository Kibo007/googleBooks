import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {mapStateToProps, mapActionToDispatch} from './../../../data/modules/books';

import Search from './../../components/search/Search';
import List from './../../components/list/List';
import Pagination from './../../components/pagination/Pagination';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let {fetchBooks, booksList, query, pageNum} = this.props;
    
    return (
      <div>

        <Search fetchBooks={fetchBooks} />
        <List booksList={booksList} />
        <Pagination query={query}
                    fetchBooks={fetchBooks}
                    pageNum={pageNum}/>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object
};

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionToDispatch,
)(App);
