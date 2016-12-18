import React from 'react';
import * as dateUtils from '../util/dateutils';
import HeaderLink from '../components/HeaderLink';

export default function UserInfoLink(props) {
  return (
    <span>
      <HeaderLink to="/">Welcome, {props.user.userName}</HeaderLink>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <HeaderLink to='/calendar'>Calendar</HeaderLink>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <HeaderLink to='/more'>More</HeaderLink>
    </span>
  )
}
