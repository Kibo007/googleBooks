import React, {Component, PropTypes} from 'react';
import {SvgIcon} from './../../assets/icons';
import classNames from 'classnames';

import styles from './list-controller.scss';

class IconBtn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.handleClick(e);
  };

  render() {
    let {icon, h, w} = this.props;

    let stateColors = {
      active: '#47477d',
      inactive: '#889bbb'
    };

    return (
      <div onClick={(event) => this.handleClick(event)}
           className={this.props.className}
           onMouseOver={() => this.setState({hover: true})}
           onMouseOut={() => this.setState({hover: false})}>
        <SvgIcon type={icon} h={h} w={w}
                 color={this.state.hover ? stateColors.active : stateColors.inactive}/>
      </div>
    );
  }
}

export class SearchBtn extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {hasActiveSearch, triggerSearch, removeSearchParams, searchBy} = this.props;
    let searchParams = classNames('ellipsis', styles.searchParams);

    return (
      <div className="btn btn-secondary btn-small mr-l"
           onClick={triggerSearch} data-layout="row"
           data-layout-align="space-between center">
        <SvgIcon h="17" w="12" color="#3E90FF" type="search"/>

        {hasActiveSearch ?
          <div data-layout="row"
               data-layout-align="space-between center"
               className={styles.filteredResults}>
            <span className={searchParams}>{searchBy}</span>
            <IconBtn className={styles.close} handleClick={removeSearchParams} icon="close" h="12" w="12"/>
          </div> : null
        }
      </div>
    );
  }
}

export class SearchInputField extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this._searchInput.focus(), 0)
  }

  render() {
    let {searchParams, handleSearchByName, triggerSearch, placeholder} = this.props;

    return (
      <input id="name" type="text" name="name"
             placeholder={placeholder}
             className="input"
             value={searchParams} onChange={handleSearchByName}
             onBlur={triggerSearch}
             ref={(c) => this._searchInput = c}/>
    );
  }
}

