import React, {Component} from 'react';
import styles from './search.scss';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
  }

  handleAuthorChange = (e) => {
    this.setState({query: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchBooks(this.state.query);
  };

  render() {

    return (
      <div>
        <form className={styles.search} onSubmit={this.handleSubmit} data-layout="row" data-layout-align="center center">
          <input type="text"
                 className="input"
                 placeholder="Enter book name"
                 value={this.state.query}
                 onChange={this.handleAuthorChange}/>
          <input className="btn btn-buy" type="submit" value="Search"/>
        </form>
      </div>
    );
  }
}