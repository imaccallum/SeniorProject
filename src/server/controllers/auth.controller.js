import { userRepo, tokenRepo } from '../repo'


const extractSchemeAndCredential = (req) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new Error('Missing authorization header')
	}

	const parts = authorization.split(' ')

	if (parts.length < 2) { 
		throw new Error('Invalid authorization header')
	}

	const scheme = parts[0]
	const credential = parts[1]

	return {
		scheme: scheme,
		credential: credential
	}
}

const extractBasic = (req) => {

	const { scheme, credential } = extractSchemeAndCredential(req)

	const credentials = new Buffer(credential, 'base64').toString().split(':');

	if (scheme !== 'Basic') {
		throw new Error('Invalid authorization scheme')
	}

	if (credentials.length < 2) {
		throw new Error('Invalid credential length')
	}

	var username = credentials[0];
	var password = credentials[1];
	
	if (!username || !password) {
		throw new Error('Invalid credentials')
	}

	return {
		username: username,
		password: password
	}
}

const extractBearer = (req) => {
	const { scheme, credential } = extractSchemeAndCredential(req)

	console.log(scheme)
	console.log(credential)
	if (scheme !== 'Bearer') {
		throw new Error('Invalid authorization scheme')
	}

	if (!credential) {
		throw new Error('Invalid credential')
	}

	return {
		accessToken: credential
	}
}
exports.requiresRegistration = async function (req, res, next) {

	try {

		const user = await userRepo.create(req.body)

		const token = tokenRepo.generate(user.id)

		req.user = user
		req.token = token

		next()

	} catch (err) {
		console.log(err)
		res.json(err)
	}
}

exports.requiresLogin = async function (req, res, next) {

	try {
		const { username, password } = extractBasic(req)

		const user = await userRepo.getByBasic(username, password)

		const token = tokenRepo.generate(user.id)

		req.user = user
		req.token = token

		next()

	} catch (err) {
		next(err)
	}



}

exports.requiresBearer = async function (req, res, next) {


	try {

		const { accessToken } = extractBearer(req)

		const token = tokenRepo.extract(accessToken)

		const { userId } = token

		if (!userId) {
			throw new Error('No user for token')
		}

		const user = await userRepo.get(userId)

		if (!user) {
			throw new Error('Unable to get user')
		}

		req.user = user
		req.token = token

		next()

	} catch (err) {
		next(err)
	}

}

exports.token = function (req, res) {

	const payload = {
		user: req.user,
		token: req.token
	}

	res.json(payload)
}

exports.me = function (req, res) {
	res.json(req.user)
}


