import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapStateToProps, mapActionToDispatch} from '../../../data/modules/bookDetails';
import styles from './detail-page.scss';

import {
  BookInfo,
  Categories,
  Description,
  BuyButton
} from './../../components/details-info/DetailsInfo';

import {SvgIcon} from './../../assets/icons';

class BookDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let bookUrl = localStorage.getItem('bookUrl');
    this.props.fetchBookDetails(bookUrl);
  }

  handleBackToSearch = () => {
    this.context.router.push('/');
    this.props.bookDetailsRemove();
  };

  render() {
    let {
      image, title, description,
      pdfLink, buyLink, categories
    } = this.props;

    return (
      <div className={styles.detailPage} data-layout="column" data-layout-align="space-around start">

        <div className="btn btn-transparent mb-m" data-layout="row" data-layout-align="start center">
          <SvgIcon type="back" h="20" w="20" color="#3E90FF"/>
          <a className="ml-s" href="#" onClick={this.handleBackToSearch}>back to books</a>
        </div>

        <div data-layout="row" data-layout-align="space-between start">

          <div className={styles.image}>
            <img src={image} alt={title}/>
          </div>

          <div className="ml-x">
            <BookInfo details={{...this.props}}/>

            <Categories categories={categories}/>

            <Description description={description}/>

            <ul data-layout="row" data-layout-align="start center">
              {pdfLink &&
                <li className="mr-m">
                  <a className="btn btn-download" href={pdfLink}>Download PDF sample</a>
                </li>
              }
              <li><BuyButton buyLink={buyLink}/></li>
            </ul>
          </div>

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
  mapActionToDispatch
)(BookDetails);