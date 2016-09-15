import React, {Component} from 'react';
import styles from './list-controller.scss';
import {SvgIcon} from './../../assets/icons';
import Select from 'react-select';
import {SearchBtn, SearchInputField} from './ListSearch';



export default class ListController extends Component {
  constructor() {
    super();
    this.state = {
      searchEnabled: false,
      searchParams: ''
    };
  }

  tableView = () => {
    this.props.changeListView(false);
  };

  listView = () => {
    this.props.changeListView(true);
  };

  componentWillMount() {
    this.debounceSearchByName = _.debounce(function (event) {
      this.props.updateSearchBy(event.target.value);
    }, 250);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({searchParams: nextProps.searchBy});
  }

  triggerSearch = () => {
    this.setState({searchEnabled: !this.state.searchEnabled});
  };

  handleSearchByName = (event) => {
    event.persist();
    this.setState({searchParams: event.target.value});
    this.debounceSearchByName(event);
  };

  removeSearchParams = () => {
    this.props.updateSearchBy('');
  };

  render() {
    let { updateSortingDirection,
          updateSortBy, sortBy, sortDirection,
          searchBy} = this.props;

    let directionOptions = [
      {value: 'az', label: '[A - Z]'},
      {value: 'za', label: '[Z - A]'}
    ];

    let sortOptions = [
      {value: 'title', label: 'Title'},
      {value: 'author', label: 'Author'},
      {value: 'publisher', label: 'Publisher'}
    ];

    // Boolean variables
    let hasActiveSearch = !_.isEmpty(searchBy);

    return (
      <div className={styles.listController}>

        {this.state.searchEnabled &&
        <SearchInputField searchParams={this.state.searchParams}
                          handleSearchByName={this.handleSearchByName}
                          triggerSearch={this.triggerSearch}
                          placeholder="Search books by name"/>
        }

        { !this.state.searchEnabled ?
          <div data-layout="row" data-layout-align="space-between center">
            <div data-layout="row" data-layout-align="space-between center">
              <div className={styles.listViewBtn} data-layout="row" data-layout-align="start center">
                <div className="btn" onClick={this.tableView}><SvgIcon type="tableView" /></div>
                <div className="btn" onClick={this.listView}><SvgIcon type="listView" /></div>
              </div>
              <SearchBtn hasActiveSearch={hasActiveSearch}
                         triggerSearch={this.triggerSearch}
                         removeSearchParams={this.removeSearchParams}
                         searchBy={searchBy}/>
            </div>

            <div data-layout="row" data-layout-align="start center">
              <Select value={sortBy}
                      options={sortOptions}
                      className={styles.sortBy}
                      onChange={(value) => updateSortBy(value)}
                      clearable={false}
                      searchable={false}/>
              <Select value={sortDirection}
                      options={directionOptions}
                      onChange={(value) => updateSortingDirection(value)}
                      clearable={false}
                      searchable={false}/>
            </div>

          </div> : null
        }


      </div>


    );
  }
}