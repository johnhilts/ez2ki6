import React from 'react';
import {Link} from 'react-router';
import * as dateUtils from '../util/dateutils';

export default function UserInfoLink(props) {
  return (
    <span>
      <Link to="/">Welcome, {props.user.userName}</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/calendar'>Calendar</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/more'>More</Link>
    </span>
  )
}
