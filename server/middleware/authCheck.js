const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const Order = require('mongoose').model('Order');
const _ = require('lodash');
const config = require('../config');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).end();
	}

	// get the last part from a authorization header string like "bearer
	// token-value"
	const token = req.headers.authorization.split(' ')[1];
	// decode the token using a secret key-phrase
	return jwt.verify(token, config.jwtSecret, (err, decoded) => {
		if (err) {
			return res.json({
				isLoggedIn: false,
			});
		}
		const userId = decoded.sub;
		return User.findById(userId, (userErr, user) => {
			if (userErr || !user) {
				return res.json({
					isLoggedIn: false,
				});
			}
			return Order.find({ parentId: user._id }, (error, orders) => {
				const userData = {
					..._.pick(user.toObject(), ['email', '_id', 'isAdmin']),
					orders: orders || [],
				};
				req.user = userData;
				if (err) {
					return next(err);
				}
				return next();
			});
		});
	});
};
