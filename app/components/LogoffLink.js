import React from 'react';

export default function LogoffLink(props) {
  return (<a href="/" onClick={props.onDeauthorize} style={{color: 'white', }}>Sign Out</a>);
}
