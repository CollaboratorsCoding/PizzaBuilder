import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import NavigationItems from '../components/Navigation/NavigationItems/NavigationItems';
import SiderToggle from '../components/Navigation/Sider/SiderToggle/SiderToggle';
import Sider from '../components/Navigation/Sider/Sider';
import './styles.css';

class Skeleton extends Component {
	state = {
		showSider: false,
	};

	siderClosedHandler = () => {
		this.setState({ showSider: false });
	};

	siderToggleHandler = () => {
		this.setState(prevState => ({
			showSider: !prevState.showSider,
		}));
	};

	render() {
		const { user, isLoggedIn, children } = this.props;
		const { email, isAdmin } = user;
		return (
			<Fragment>
				<header className="main--header">
					<SiderToggle clicked={() => this.siderToggleHandler()} />
					<nav className="nav--desktop">
						<NavigationItems
							isAuthenticated={isLoggedIn}
							email={email}
							isAdmin={isAdmin}
						/>
					</nav>
					<Sider
						email={email}
						isAdmin={isAdmin}
						isAuthenticated={isLoggedIn}
						open={this.state.showSider}
						closed={this.siderClosedHandler}
					/>
				</header>
				<main className="main--content">{children}</main>
			</Fragment>
		);
	}
}

export default withRouter(Skeleton);
