import React from 'react';
import ReactRouter from 'react-router';
import Rebase from 're-base';
import * as db from '../core/database';
var base = Rebase.createClass(db.firebaseConfig);
import Register from '../components/Register';

const RegisterContainer = React.createClass({

	// NOTE: contextTypes doesn't scale well, but ok for limited use such as with routers
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			'users': {},
		}
	},

	// NOTE: componentDidMount is used to initialize a component with server-side info
	// fore more info, see react docs: https://facebook.github.io/react/docs/component-specs.html
	componentDidMount() {
		this.ref = base.syncState('users', {
			context : this,
			state : 'users',
		});
	},

	componentWillUnmount() {
		base.removeBinding(this.ref);
	},

	registerFields : {name: 0, email: 1, password: 2, },

  handleRegisterSubmit(event) {
    event.preventDefault();

    let user = {
      userName: event.target[this.registerFields.name].value,
      email: event.target[this.registerFields.email].value,
    };
		let password = event.target[this.registerFields.password].value;

		base.createUser({
			email: user.email,
			password: password,
		}, this.createUserSuccess.bind(null, user));

  },

	createUserSuccess: function(user, err, authData) {
		if (err) {
			alert(err.message);
			return;
		}

		user.owner = authData.uid;

		this.state.users[user.owner] = user;

    this.setState({ users : this.state.users});

    this.props.onAuthorize(user);

    this.context.router.push('/');
	},

	handleUpdateUserName(event) {
    this.setState({ inputUserName: [event.target.value] })
	},

	handleUpdateEmail(event) {
    this.setState({ inputEmail: [event.target.value] })
	},

	handleUpdatePassword(event) {
    this.setState({ inputPassword: [event.target.value] })
	},

  render() {
    return (
      <Register
        onSubmit={this.handleRegisterSubmit}
        onUpdateUserName={this.handleUpdateUserName}
        onUpdateEmail={this.handleUpdateEmail}
        onUpdatePassword={this.handleUpdatePassword}
      />
    )
  }
});

export default RegisterContainer;
