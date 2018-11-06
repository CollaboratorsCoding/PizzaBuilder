import React from 'react';
import { connect } from 'react-redux';
import OrderSummary from '../Order/OrderSummary';

const Profile = ({ orders }) => {
	const ordersRender = orders.map((order, index) => (
		<OrderSummary
			key={order._id}
			inProfile={index + 1}
			ingredients={order.ingredients}
			totalPrice={order.totalPrice}
			date={order.date ? order.date.substring(0, 10) : 'Nowe zamówienie'}
			inModal
		/>
	));
	return <div className="header--profile">{ordersRender}</div>;
};

const mapStateToProps = state => ({ orders: state.auth.orders });

export default connect(mapStateToProps)(Profile);
