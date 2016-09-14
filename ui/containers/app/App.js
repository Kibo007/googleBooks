import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {mapStateToProps, mapActionToDispatch} from './../../../data/modules/books';

import Search from './../../components/search/Search';
import List from './../../components/list/List'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    
    return (
      <div>

        <Search fetchBooks={this.props.fetchBooks} />
        <List booksList={this.props.booksList} />
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
