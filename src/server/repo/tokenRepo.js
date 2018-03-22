const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

exports.extract = function (token) {
	const payload = jwt.verify(token, secret);

	if (!payload) {
		throw new Error('Failed to verify token')
	}

	return payload
}

exports.generate = function (userId) {

	const payload = {
		userId: userId,
	}

	const options = {
		expiresIn: '30d'
	}

	const token = jwt.sign(payload, secret, options)

	return token
}

