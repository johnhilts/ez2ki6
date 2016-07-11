import React from 'react';
import Main from '../containers/MainContainer';
import LoginContainer from '../containers/LoginContainer';
import CalendarContainer from '../containers/CalendarContainer';

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
    ? <CalendarContainer {...props} />
    : <LoginContainer user={props.user} onAuthorize={props.onAuthorize} />
  )
}

export default Home;
