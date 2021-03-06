import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Spin } from 'antd';
import Skeleton from './hoc/Skeleton';

import Auth from './container/Auth/Auth';
import PizzaMaker from './container/PizzaMaker/PizzaMaker';
import Profile from './container/Profile/Profile';
import Landing from './container/Landing/Landing';
import Logout from './components/Logout';
import AuthActions from './store/actions/auth';

const { authLogin, authRegister, authCheck, authLogout } = AuthActions;
class App extends Component {
	componentWillMount = () => {
		this.props.authCheck();
	};

	render() {
		const {
			checkedAuth,
			isLoggedIn,
			user,
			errors,
			handleLogout,
			handleLogin,
			handleRegister,
		} = this.props;

		if (!checkedAuth) {
			return (
				<div className="header">
					<Spin size="large" />
				</div>
			);
		}
		let routes;

		if (!isLoggedIn) {
			routes = (
				<Switch>
					<Route
						path="/auth"
						render={props => (
							<Auth
								{...props}
								user={user}
								errors={errors}
								handleLogin={handleLogin}
								handleRegister={handleRegister}
							/>
						)}
					/>
					<Route path="/" exact component={PizzaMaker} />

					<Redirect to="/" />
				</Switch>
			);
		}
		if (isLoggedIn) {
			routes = (
				<Switch>
					{user.isAdmin ? (
						<Route path="/landing" component={Landing} />
					) : null}

					<Route
						path="/profile"
						exact
						render={props => (
							<Profile {...props} orders={user.orders} />
						)}
					/>
					<Route
						path="/logout"
						render={props => (
							<Logout {...props} handleLogout={handleLogout} />
						)}
					/>

					<Route path="/" exact component={PizzaMaker} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return (
			<BrowserRouter>
				<Skeleton {...this.props}>{routes}</Skeleton>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => ({
	...state.auth,
});
const mapDispatchToProps = dispatch => ({
	authCheck: () => dispatch(authCheck()),
	handleLogout: () => dispatch(authLogout()),
	handleLogin: userData => dispatch(authLogin(userData)),
	handleRegister: userData => dispatch(authRegister(userData)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
