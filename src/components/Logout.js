import React, { Component } from 'react';

class Logout extends Component {
	componentDidMount = () => {
		this.props.logout();
	};

	render() {
		return <div />;
	}
}

export default Logout;
