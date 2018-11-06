import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

class Landing extends Component {
	state = {
		className: 'hidden',
		users: [],
	};
	// eslint-disable-next-line
	componentDidMount() {
		window.onscroll = () => this.handleScroll();
		const token = localStorage.getItem('token');
		if (token !== null) {
			return axios
				.get('/admin/getusers', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(response => this.setState({ users: response.data.users }))
				.catch(() => {});
		}
	}

	handleScroll() {
		if (document.documentElement.scrollTop > 430) {
			this.setState({ className: 'show' });
		}
	}

	render() {
		const users = this.state.users.map(user => (
			<tr key={user._id}>
				<td>{user._id}</td>
				<td>{user.email}</td>
				<td>{user.orders.length}</td>
				<td>{user.isAdmin}</td>
				<td>DELETE</td>
			</tr>
		));
		return (
			<div>
				<div className="header">
					<h1>Привет, Админ! &#8595;&#8595;&#8595;</h1>
				</div>

				<div className="about-wrapper">
					<div className="about-text">
						<div className={this.state.className}>
							<table className="blueTable">
								<thead>
									<tr>
										<th>ID</th>
										<th>EMAIL</th>
										<th>ЗАКАЗОВ</th>
										<th>ADMIN</th>
										<th>FUNCTIONS</th>
									</tr>
								</thead>

								<tbody>{users}</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
