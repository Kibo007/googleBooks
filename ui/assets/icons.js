import React, {Component, PropTypes} from 'react'

export const SvgIcon = (props) => {
  const Icons = {
    close: <Close {...props}/>,
    search: <Search {...props}/>,
    back: <Back {...props}/>,
    loading: <Loading {...props}/>,
    tableView: <TableView />,
    listView: <ListView />
  };

  return (
    Icons[props.type]
  )
};

const Close = (props) => {
  return (
    <svg width={props.w} height={props.h} viewBox="0 0 16 16">
      <g fill={props.color} fillRule="evenodd" transform="rotate(-90 8.142 7.707)">
        <polygon points=".646 1.354 14.379 15.086 14.733 15.44 15.44 14.733 15.086 14.379 1.354 .646 1 .293 .293 1"/>
        <polygon points="1.354 15.086 15.086 1.354 14.379 .646 .646 14.379"/>
      </g>
    </svg>
  )
};

const Search = (props) => {
  return (
    <svg width={props.w} height={props.h} viewBox="0 0 15 16">
      <path fill="#3E90FF" fillRule="evenodd"
            d="M13.2965376,15.8595495 C15.9869851,15.2669194 18,12.8685421 18,10 C18,6.6862915 15.3137085,4 12,4 C8.6862915,4 6,6.6862915 6,10 C6,12.9682931 8.15545076,15.4331537 10.9865376,15.9147672 L10.9865376,20.078517 C10.9865376,20.7184502 11.5036487,21.2339556 12.1415376,21.2339556 C12.7838737,21.2339556 13.2965376,20.7166481 13.2965376,20.078517 L13.2965376,15.8595495 Z M12.2668324,13.7406532 C14.2133738,13.6038077 15.75,11.981353 15.75,10 C15.75,7.92893219 14.0710678,6.25 12,6.25 C9.92893219,6.25 8.25,7.92893219 8.25,10 C8.25,12.0542149 9.90171944,13.7226501 11.9495199,13.7496672 C12.0119073,13.7393328 12.0760485,13.7339556 12.1415376,13.7339556 C12.1838731,13.7339556 12.2256767,13.7362262 12.2668324,13.7406532 Z"
            transform="rotate(-40 4.505 16.112)"/>
    </svg>
  )
};

const Back = (props) => {
  return (
    <svg width={props.w} height={props.h} viewBox="0 0 19 9">
      <g fill="none" fillRule="evenodd" stroke={props.color}>
        <path d="M1.31239804,4.5 L18.312398,4.5" strokeLinecap="square"/>
        <polyline points="-.688 7 3.312 2 3.312 2 7.312 7" transform="rotate(-90 3.312 4.5)"/>
      </g>
    </svg>
  )
};

const Loading = (props) => {
  return (
    <svg viewBox="0 0 32 32" width={props.w} height={props.h}>
      <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
      <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
        <animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" />
      </path>
    </svg>
  )
};

const TableView = () => {
  return (
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="menu-1" fill="#3E90FF">
          <g id="Group">
            <rect id="Rectangle-path" x="11.3793103" y="0" width="8.62068966" height="8.62068966"></rect>
            <rect id="Rectangle-path" x="0" y="0" width="8.62068966" height="8.62068966"></rect>
            <rect id="Rectangle-path" x="0" y="11.3793103" width="8.62068966" height="8.62068966"></rect>
            <rect id="Rectangle-path" x="11.3793103" y="11.3793103" width="8.62068966" height="8.62068966"></rect>
          </g>
        </g>
      </g>
    </svg>
  )
};

const ListView = () => {
  return (
    <svg width="20px" height="20px" viewBox="0 0 20 20">
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="bars" fill="#3E90FF">
          <g id="Layer_1">
            <g id="Group">
              <rect id="Rectangle-path" x="0" y="0" width="20" height="2.60869565"></rect>
              <rect id="Rectangle-path" x="0" y="17.3913043" width="20" height="2.60869565"></rect>
              <rect id="Rectangle-path" x="0" y="8.69565217" width="20" height="2.60869565"></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
};