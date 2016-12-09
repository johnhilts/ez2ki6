import React from 'react';
import {Link} from 'react-router';
import * as dateUtils from '../util/dateutils';

export default function UserInfoLink(props) {
  return (
    <span>
      <Link to="/" style={{color: 'white', }}>Welcome, {props.user.userName}</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/calendar' style={{color: 'white', }}>Calendar</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/more' style={{color: 'white', }}>More</Link>
    </span>
  )
}
