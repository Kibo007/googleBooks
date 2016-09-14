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
      <div data-layout="column" data-layout-align="space-between center">
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                 placeholder="Enter book name"
                 value={this.state.query}
                 onChange={this.handleAuthorChange}/>
          <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
}