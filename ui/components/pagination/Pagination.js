import React, {Component} from 'react';
import styles from './pagination.scss';
import ReactPaginate from 'react-paginate';

export default class Pagination extends Component {
  constructor() {
    super();
  }

  handlePageClick = (data) => {
    let selected = data.selected + 1;
    let offset = Math.ceil(selected * 10);

    this.props.fetchBooks(this.props.query, offset);
  };

  render() {
    return (
      <div data-layout="column" data-layout-align="space-between center">
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="#">...</a>}
                       breakClassName={"break-me"}
                       pageNum={this.props.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    );
  }
}