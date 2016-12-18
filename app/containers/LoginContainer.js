import React from 'react';
import ReactRouter from 'react-router';
import * as userRepository from '../domain/UserRepository';
import Login from '../components/Login';

const LoginContainer = React.createClass({

  // NOTE: contextTypes doesn't scale well, but ok for limited use such as with routers
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      'users': {},
      'password': '',
    }
  },

	loginFields : {email: 0, password: 1, },

  handleLoginSubmit(event) {
    event.preventDefault();

    var loginInput = {email: event.target[this.loginFields.email].value, password: event.target[this.loginFields.password].value};

    userRepository.authenticateByEmailAndPassword(loginInput.email, loginInput.password,
      this.authUserSuccess.bind(null, loginInput));
  },

  authUserSuccess(loginInput, err, authData) {

    if (err) {
      alert(err.message);
      return;
    }

    this.setState({password: loginInput.password});

    const onFetchSuccess = (user) => {
      if (!user) {
        alert('Login Failed');
        return;
      }
      this.props.onAuthorize(user);

      this.context.router.push('/');
    }

    userRepository.fetchUserInfo(this, authData.uid, onFetchSuccess);
  },

  handleUpdateEmail(event) {
    this.setState({ inputEmail: [event.target.value] })
  },

  handleUpdatePassword(event) {
    this.setState({ inputPassword: [event.target.value] })
  },

  render() {
    return (
      <Login
      onSubmit={this.handleLoginSubmit}
      onUpdateEmail={this.handleUpdateEmail}
      onUpdatePassword={this.handleUpdatePassword}
      />
    )
  }
});

export default LoginContainer;
