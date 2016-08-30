import React from 'react';
import ReactRouter, {Link} from 'react-router';
import UserPrompt from '../components/UserPrompt';
import Rebase from 're-base';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);

var styles = {
  header: {
    background: '#EC7063',
  },
  innerHeader: {
    marginLeft:20,marginTop:20,marginBottom:20,
  },
  container: {
    width: '90%',
    height: '80%',
    marginLeft:20,marginTop:20,marginBottom:20,
  },
  footer: {
    marginLeft:20,marginTop:20,marginBottom:20,
  },
}

const MainContainer = React.createClass({
  getInitialState() {
    var user = {owner: 0};

		var localStorageRef = localStorage.getItem('user');

		if (localStorageRef) {
      user = JSON.parse(localStorageRef);
		}

    return {
      user: user,
    }
  },

  handleAuthorization(user) {
    return this.handleSaveUser(user);
  },

  handleDeauthorization() {
    var user = {owner: 0};
    base.unauth();
    return this.handleSaveUser(user);
  },

  handleSaveUser(user) {
		localStorage.setItem('user', JSON.stringify(user));
    return this.setState({user: user});
  },

  handleSaveDateInfo(dates) {
    var user = this.state.user;
    user.dates = dates;
    return this.handleSaveUser(user);
  },

  handleSaveCalendarInfo(calendar) {
    var user = this.state.user;
    user.calendars.push(calendar);
    return this.handleSaveUser(user);
  },

  renderHeader() {
    return (
      <div style={styles.header}>
        <div style={styles.innerHeader}>
          <h1>
            <Link to="/">ez2ki6</Link>
          </h1>
        </div>
        <div style={styles.innerHeader}>
          <UserPrompt user={this.state.user} onDeauthorize={this.handleDeauthorization} />
        </div>
      </div>
    )
  },

  renderFooter() {
    var year = (new Date()).getFullYear();
    return (
      <div style={styles.footer}>
        <p>ez2ki6 &copy; {year}</p>
      </div>
    )
  },

  render() {
    return (
      <div>
        {this.renderHeader()}
        <div style={styles.container}>
          {React.cloneElement(this.props.children,
            { onAuthorize: this.handleAuthorization, user: this.state.user, onSaveDateInfo: this.handleSaveDateInfo, onSaveCalendarInfo: this.handleSaveCalendarInfo, })}
        </div>
        {this.renderFooter()}
      </div>
    )
  }
});

export default MainContainer;
