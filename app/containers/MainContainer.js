import React from 'react';
import ReactRouter, {Link} from 'react-router';
import * as db from '../core/database';
import * as userRepository from '../domain/UserRepository';
import * as themeUtils from '../util/themeutils';
import UserPrompt from '../components/UserPrompt';
import CalendarEntryContainer from '../containers/CalendarEntryContainer';

var styles = {
  header: {
    background: '#EC7063',
  },
  innerHeader: {
    marginLeft:20,marginTop:5,marginBottom:5,
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
    userRepository.unauth();
    return this.handleSaveUser(user);
  },

  handleSaveUser(user) {
		localStorage.setItem('user', JSON.stringify(user));
    return this.setState({user: user});
  },

  handleSaveDateInfo(dates) {
    var user = this.state.user;
    user.calendars[user.currentCalendarId].dates = dates;
    return this.handleSaveUser(user);
  },

  handleSaveCalendarInfo(calendar) {
    var user = this.state.user;
    user.calendars.push(calendar);
    return this.handleSaveUser(user);
  },

  handleSaveCurrentCalendarId(currentCalendarId) {
    var user = this.state.user;
    user.currentCalendarId = currentCalendarId;
    return this.handleSaveUser(user);
  },

  handleSaveThemeId(themeId) {
    var user = this.state.user;
    user.themeId = themeId;
    userRepository.update(db.getUserRoot(this.state.user.owner), {
      data: {themeId: themeId, },
    });
    return this.handleSaveUser(user);
  },

  renderHeader(user, theme) {
    let menuTheme = `${theme} t-header`
    return (
      <div className={menuTheme}>
        <div className="row">
          <div className="col-sm-3" style={styles.innerHeader}>
            <h1>
              <Link to="/">ez2ki6</Link>
            </h1>
          </div>
          <div className="col-sm-5 col-md-6" style={styles.innerHeader}>
            <h3>
              <CalendarEntryContainer
                calendars={user.calendars}
                currentCalendarId={user.currentCalendarId}
                onSaveCalendarInfo={this.handleSaveCalendarInfo}
                onSaveCurrentCalendarId={this.handleSaveCurrentCalendarId}
                user={user}
              />
            </h3>
          </div>
        </div>
        <div style={styles.innerHeader}>
          <UserPrompt user={user} onDeauthorize={this.handleDeauthorization} />
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
    let theme = themeUtils.getThemeById(this.state.user.themeId);
    try {
    return (
      <div className={theme}>
        {this.renderHeader(this.state.user, theme)}
        <div style={styles.container}>
          {React.cloneElement(this.props.children,
            { onAuthorize: this.handleAuthorization,
              user: this.state.user,
              onSaveDateInfo: this.handleSaveDateInfo,
              onSaveCalendarInfo: this.handleSaveCalendarInfo,
              onSaveCurrentCalendarId: this.handleSaveCurrentCalendarId,
              onSaveThemeId: this.handleSaveThemeId,
              key: this.state.user.currentCalendarId, })}
        </div>
        {this.renderFooter()}
        <div style={{height: '100vh', }}>
          &nbsp;
        </div>
      </div>
    )
  }
    catch (e) {
      alert(e.toString());
    }
  }
});

export default MainContainer;
