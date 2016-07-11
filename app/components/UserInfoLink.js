import React from 'react';
import {Link} from 'react-router';

export default function UserInfoLink(props) {
  return (
    <span>
      <Link to="/">Welcome, {props.user.userName}</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/setup">Setup</Link>
    </span>
  )
}
