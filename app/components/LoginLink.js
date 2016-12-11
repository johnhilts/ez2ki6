import React from 'react';
import {Link} from 'react-router';
import HeaderLink from '../components/HeaderLink';

export default function LoginLink(props) {
  return (<HeaderLink to="/login">Sign In</HeaderLink>);
}
