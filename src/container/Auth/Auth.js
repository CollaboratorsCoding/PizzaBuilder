import React, { Component } from 'react';
import { Button } from 'antd';

import SignUp from './signUp';
import SignIn from './signIn';

class Auth extends Component {
	state = {
		signUp: true,
	};

	changeForm = () => {
		this.setState(prevState => ({
			signUp: !prevState.signUp,
		}));
	};

	render() {
		const { signUp } = this.state;
		const { errors, handleLogin, handleRegister } = this.props;
		let form = <SignUp errors={errors} sendForm={handleRegister} />;
		if (!signUp) {
			form = <SignIn errors={errors} sendForm={handleLogin} />;
		}
		return (
			<div className="header">
				<div className="form--signup">{form}</div>
				<Button onClick={() => this.changeForm()} type="dashed">
					{signUp ? 'Sign In' : 'Sign Up'}
				</Button>
			</div>
		);
	}
}

export default Auth;
