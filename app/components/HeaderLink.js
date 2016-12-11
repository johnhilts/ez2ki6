import React from 'react';
import ReactRouter, {Link} from 'react-router';

export default function HeaderLink(props) {

    return (
      <Link {...props} style={{color: 'white', }} />
    )

}
