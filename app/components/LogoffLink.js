import React from 'react';
import HeaderLink from '../components/HeaderLink';

export default function LogoffLink(props) {
  return (<HeaderLink to="/" onClick={props.onDeauthorize}>Sign Out</HeaderLink>);
}
