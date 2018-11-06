import React from 'react';
import OrderSummary from '../Order/OrderSummary';

const Profile = ({ orders }) => {
	if (!orders || !orders.length) return 'You dont have any orders for now';
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

export default Profile;
