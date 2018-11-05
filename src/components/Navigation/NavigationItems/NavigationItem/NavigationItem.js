import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

const navigationItem = ({ className, exact, children, link }) => (
	<li
		className={
			className
				? `main--navigation--item ${className}`
				: 'main--navigation--item'
		}
	>
		<NavLink to={link} exact={exact} activeClassName="active">
			{children}
		</NavLink>
	</li>
);

export default navigationItem;
