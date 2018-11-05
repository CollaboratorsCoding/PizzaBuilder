import React from 'react';
import { Icon } from 'antd';
import './style.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
	const menuitemsNotLogged = [
		{
			path: '/',
			name: 'Конструктор Пиццы',
		},
		{
			path: '/auth',
			name: 'Регистрация/Логин',
		},
	];
	const menuitemsLogged = [
		{
			path: '/',
			name: 'Конструктор Пиццы',
		},
		{
			path: '/logout',
			name: 'Выйти',
		},
		{
			path: '/profile',
			name: props.email,
		},
	];
	if (props.isAdmin) {
		menuitemsLogged.push({ path: '/landing', name: <Icon type="code" /> });
	}
	let navItems = menuitemsNotLogged.map(navItem => (
		<NavigationItem key={navItem.path} link={navItem.path} exact>
			{navItem.name}
		</NavigationItem>
	));
	if (props.isAuthenticated) {
		navItems = menuitemsLogged.map(navItem => {
			if (navItem.path === '/logout') {
				return (
					<NavigationItem
						key={navItem.path}
						className="logout--btn"
						link={navItem.path}
						exact
					>
						{navItem.name}
					</NavigationItem>
				);
			}
			return (
				<NavigationItem key={navItem.path} link={navItem.path} exact>
					{navItem.name}
				</NavigationItem>
			);
		});
	}
	return <ul className="main--navigation--items">{navItems}</ul>;
};

export default navigationItems;
