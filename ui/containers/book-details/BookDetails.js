import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {mapStateToProps, mapActionToDispatch} from '../../../data/modules/bookDetails';

class BookDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let bookUrl = localStorage.getItem('bookUrl');
    this.props.fetchBookDetails(bookUrl);
  }

  render() {
    let {
      image, title, subtitle, author,
      publisher, published, description,
      price, pdfLink, buyLink, categories
    } = this.props;
    const createMarkup = () => { return {__html: description} };

    return (
      <div data-layout="row" data-layout-align="space-between center">
        <div>
          <img src={image} alt=""/>
        </div>

        <div>
          <ul data-layout="column" data-layout-align="space-between start">
            <li>{title}</li>
            <li>{subtitle}</li>
            <li>{author}</li>
            <li>{publisher}</li>
            <li>{published}</li>
            <li>{price}</li>
          </ul>

          <ul data-layout="row" data-layout-align="space-between center">
            <li>{categories}</li>
            <li dangerouslySetInnerHTML={createMarkup()}></li>
          </ul>

          <ul data-layout="row" data-layout-align="space-between start">
            <li>{pdfLink}</li>
            <li>{buyLink}</li>
          </ul>
        </div>

      </div>
    );
  }
}

BookDetails.propTypes = {
  location: PropTypes.object
};

BookDetails.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionToDispatch,
)(BookDetails);