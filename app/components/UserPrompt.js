import React from 'react';
import LoginLink from './LoginLink';
import SignupLink from './SignupLink';
import UserInfoLink from './UserInfoLink';
import LogoffLink from './LogoffLink';

export default function UserPrompt (props) {
    return (
      props.user.owner === 0
      ?
      <p>
        <LoginLink />
        &nbsp;or&nbsp;
        <SignupLink />
      </p>
      :
      <div>
          <UserInfoLink user={props.user} />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <LogoffLink onDeauthorize={props.onDeauthorize} />
      </div>
    );
  }
