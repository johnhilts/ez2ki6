import React from 'react';
import {Link} from 'react-router';
import HeaderLink from '../components/HeaderLink';

export default function SignupLink(props) {
  return (<HeaderLink to='/register'>Sign Up</HeaderLink>);
}
