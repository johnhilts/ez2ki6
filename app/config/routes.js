import React from 'react';
import ReactRouter, {Router, Route, browserHistory, IndexRoute} from 'react-router';
import MainContainer from '../containers/MainContainer';
import Home from '../components/Home';
import RegisterContainer from '../containers/RegisterContainer';
import LoginContainer from '../containers/LoginContainer';
import CalendarContainer from '../containers/CalendarContainer';
import WeekContainer from '../containers/WeekContainer';
import DateContainer from '../containers/DateContainer';
import MoreContainer from '../containers/MoreContainer';
import NotFound from '../components/NotFound';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={Home} />
  		<Route path='register' header='Register' component={RegisterContainer} />
  		<Route path='login' header='Login' component={LoginContainer} />
      <Route path='calendar' header='Date' component={CalendarContainer} location="history" />
      <Route path='calendar/:ym' header='Date' component={CalendarContainer} location="history" />
      <Route path='week' header='Week' component={WeekContainer} location="history" />
      <Route path='day' header='Day' component={DateContainer} location="history" />
      <Route path='more' component={MoreContainer} location="history" />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
