import React from 'react';

export default function LogoffLink(props) {
  return (<a href="/" onClick={props.onDeauthorize} >Sign Out</a>);
}
