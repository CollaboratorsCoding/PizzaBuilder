const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../config');
/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true,
	},
	(req, email, password, done) => {
		const userData = {
			email: email.trim(),
			password: password.trim(),
		};

		const newUser = new User(userData);
		newUser.save((err, user) => {
			if (err) {
				return done(err);
			}
			const payload = {
				sub: user._id,
				isAdmin: user.isAdmin,
			};

			// create a token string
			const token = jwt.sign(payload, config.jwtSecret);

			return done(null, token, user);
		});
	}
);
