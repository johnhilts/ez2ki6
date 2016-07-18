import React from 'react';
import ReactRouter, {Router, Route, browserHistory, IndexRoute} from 'react-router';
import MainContainer from '../containers/MainContainer';
import Home from '../components/Home';
import RegisterContainer from '../containers/RegisterContainer';
import LoginContainer from '../containers/LoginContainer';
import CalendarContainer from '../containers/CalendarContainer';
import DateContainer from '../containers/DateContainer';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={Home} />
  		<Route path='register' header='Register' component={RegisterContainer} />
  		<Route path='login' header='Login' component={LoginContainer} />
      <Route path='calendar' header='Date' component={CalendarContainer} location="history" />
      <Route path='calendar/:ym' header='Date' component={CalendarContainer} location="history" />
      <Route path='day' header='Date' component={DateContainer} location="history" />
    </Route>
  </Router>
);

export default routes;
