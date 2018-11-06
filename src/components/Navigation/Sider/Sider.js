import React, { Fragment } from 'react';

// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './style.css';
import BackBlack from './BackBlack/BackBlack';

const sideDrawer = props => {
	let attachedClasses = ['main--sider', 'main--sider--close'];
	if (props.open) {
		attachedClasses = ['main--sider', 'main--sider--open'];
	}
	return (
		<Fragment>
			<BackBlack show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<nav>
					<NavigationItems
						isAuthenticated={props.isAuthenticated}
						isAdmin={props.isAdmin}
						email={props.email}
					/>
				</nav>
			</div>
		</Fragment>
	);
};

export default sideDrawer;
