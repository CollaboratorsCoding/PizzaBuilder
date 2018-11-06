import React, { Component } from 'react';

class Logout extends Component {
	componentDidMount = () => {
		this.props.handleLogout();
	};

	render() {
		return <div />;
	}
}

export default Logout;
