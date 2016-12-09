import React from 'react';
import {Link} from 'react-router';

export default function LoginLink(props) {
  return (<Link to="/login" style={{color: 'white', }}>Sign In</Link>);
}
