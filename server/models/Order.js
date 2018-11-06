const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	ingredients: Array,
	date: {
		type: Date,
		default: Date.now,
	},
	parentId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	totalPrice: String,
});

module.exports = mongoose.model('Order', OrderSchema);
