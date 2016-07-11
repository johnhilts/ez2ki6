import React from 'react';
import Main from '../containers/MainContainer';
import LoginContainer from '../containers/LoginContainer';

var styles = {
  container: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  header: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 100,
  },
}

const Home = (props) => {
  return (
    props.user && props.user.owner !== 0
    ? <div>Welcome to ez2ki6</div>
    : <LoginContainer user={props.user} onAuthorize={props.onAuthorize} />
  )
}

export default Home;
