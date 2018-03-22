const { User } = require('../models')

exports.create = async function (body) {
	delete body.roles;

	var user = new User(body);
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	await user.save()

	user.password = undefined;
	user.salt = undefined;

	return user
}

exports.get = async function (userId) {
	const user = await User.findById(userId, '-salt -password -providerData')
	return user
}

exports.getByBasic = async function (email, password) {

	const query = { email: email }

	const user = await User.findOne(query)

	if (!user) {
		throw new Error(`No user found for: ${email}`)
	}

	console.log('USER')
	console.log(user)

	const isAuthenticated = user.authenticate(password)

	if (!isAuthenticated) {
		throw new Error('Not authenticated')
	}

	return user
}

exports.update = async function (user, body) {

	user.firstName = body.firstName;
	user.lastName = body.lastName;
	user.displayName = user.firstName + ' ' + user.lastName;
	user.roles = body.roles;

	await user.save()

	return user
}

exports.delete = async function (user) {

	await user.remove()

	return user
};

exports.list = async function () {

	const users = await User.find({}, '-salt -password -providerData')
	.sort('-created')
	.populate('User', 'displayName')
	.exec()

	return users
}