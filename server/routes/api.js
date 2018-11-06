const express = require('express');
const User = require('mongoose').model('User');
const Order = require('mongoose').model('Order');

const router = new express.Router();
const data = require('../data');
const authCheckMiddleware = require('../middleware/authCheck');

router.get('/ingredients', (req, res) => res.json(data));

router.get('/user', authCheckMiddleware, (req, res) => {
	res.json({ success: true, user: req.user, isLoggedIn: !!req.user });
});
router.get('/users', authCheckMiddleware, (req, res) => {
	if (req.user.isAdmin) {
		return User.find({}, (err, users) => res.json({ users }));
	}
	return res.status(403).json('Access Denied');
});

router.post('/order', authCheckMiddleware, (req, res) => {
	if (!!req.user && !!req.body.order) {
		console.log(req.user);
		const order = new Order({
			parentId: req.user._id,
			ingredients: req.body.order.ingredients,
			totalPrice: req.body.order.totalPrice,
		});
		return order.save((err, newOrder) => {
			if (err) {
				console.log(err);
			} else {
				res.json({
					order: newOrder,
				});
			}
		});
	}

	res.json({ success: true, user: req.user });
});
module.exports = router;
