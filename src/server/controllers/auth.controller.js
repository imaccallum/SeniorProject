import { userRepo, tokenRepo } from '../repo'


const extractSchemeAndCredential = async (req) => {
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

const extractBasic = async (req) => {

	const { scheme, credential } = await extractSchemeAndCredential(req)

	const credentials = new Buffer(credential, 'base64').toString().split(':');

	if (scheme !== 'Basic') {
		throw new Error('Invalid authorization scheme')
	}

	if (credentials.length < 2) {
		throw new Error('Invalid credential length')
	}

	var email = credentials[0];
	var password = credentials[1];
	
	if (!email || !password) {
		throw new Error('Invalid credentials')
	}

	return {
		email: email,
		password: password
	}
}

const extractBearer = async (req) => {
	const { scheme, credential } = await extractSchemeAndCredential(req)

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
		next(err)
	}
}

exports.requiresLogin = async function (req, res, next) {

	try {

		console.log('A')
		const { email, password } = await extractBasic(req)
		console.log('B')
		const user = await userRepo.getByBasic(email, password)
		console.log('C')
		const token = tokenRepo.generate(user.id)

		req.user = user
		req.token = token

		next()

	} catch (err) {
		console.log('LOGIN ERROR')
		console.log(err)
		next(err)
	}
}

exports.requiresBearer = async function (req, res, next) {

	try {

		const { accessToken } = await extractBearer(req)

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


