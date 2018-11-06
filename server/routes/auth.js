const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
	const errors = [];
	if (
		!payload ||
		typeof payload.email !== 'string' ||
		!validator.isEmail(payload.email)
	) {
		errors.push({
			fieldName: 'email',
			fieldValue: payload.email,
			message: 'Please provide a correct email address.',
		});
	}

	if (
		!payload ||
		typeof payload.password !== 'string' ||
		payload.password.trim().length < 8
	) {
		errors.push({
			fieldName: 'password',
			fieldValue: payload.password,
			message: 'Password must have at least 8 characters.',
		});
	}

	return errors;
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
	const errors = [];
	if (
		!payload ||
		typeof payload.email !== 'string' ||
		payload.email.trim().length === 0
	) {
		errors.push({
			fieldName: 'email',
			fieldValue: payload.email,
			message: 'Please provide your email address.',
		});
	}

	if (
		!payload ||
		typeof payload.password !== 'string' ||
		payload.password.trim().length === 0
	) {
		errors.push({
			fieldName: 'password',
			fieldValue: payload.password,
			message: 'Please provide your password.',
		});
	}
	return errors;
}

router.post('/signup', (req, res, next) => {
	const validationResult = validateSignupForm(req.body);
	if (validationResult.length) {
		return res.status(400).json({ errors: validationResult });
	}

	return passport.authenticate('local-signup', (err, token, userData) => {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				// the 11000 Mongo code is for a duplication email error the 409 HTTP status
				// code is for conflict error
				return res.status(409).json({
					errors: [
						{
							fieldName: 'email',
							fieldValue: req.body.email,
							message: 'Email is already in use.',
						},
					],
				});
			}

			return res.status(400).json({
				errors: [
					{
						fieldName: 'email',
						fieldValue: req.body.email,
						message: 'Unexpected error',
					},
				],
			});
		}
		// #TODO login auto
		return res.status(200).json({
			user: userData,
			token,
		});
	})(req, res, next);
});

router.post('/login', (req, res, next) => {
	const validationResult = validateLoginForm(req.body);
	if (validationResult.length) {
		return res.status(400).json({
			erorrs: validationResult,
		});
	}

	return passport.authenticate('local-login', (err, token, userData) => {
		if (err) {
			if (err.name === 'IncorrectCredentialsError') {
				return res.status(409).json({
					errors: [
						{
							fieldName: 'password',
							fieldValue: req.body.password,
							message: 'Wrongs password',
						},
					],
				});
			}

			return res.status(400).json({
				errors: [
					{
						fieldName: 'password',
						fieldValue: req.body.password,
						message: 'Unexpected error',
					},
				],
			});
		}

		return res.json({
			success: true,
			message: 'You have successfully logged in!',
			token,
			user: userData,
		});
	})(req, res, next);
});

module.exports = router;
