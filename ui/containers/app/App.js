import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {mapStateToProps, mapActionToDispatch} from './../../../data/modules/books';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    
    return (
      <div>
        my new app
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionToDispatch,
)(App);
