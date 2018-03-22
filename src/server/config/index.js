const ip = require('ip');
const path = require('path');

// Only load env file in dev mode, default to production mode
const env = process.env.NODE_ENV || 'production';

if (env !== 'production') {
	const dotEnv = require('dotenv');
	dotEnv.config();
}

const config = {};

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

let shouldExit = false;

function getRequiredEnvVar(envVar) {
	const loaded = process.env[envVar];

	if (loaded) {
		return loaded;
	}

	console.log(`Missing required environmental variable: ${envVar}`);
	shouldExit = true;
	return undefined;
}


// Environment
config.environment = env;
config.isProduction = config.environment === 'production';
config.isDevelopment = config.environment === 'development';
config.isTesting = config.environment === 'testing';

// Security
const isSecure = config.isProduction
config.security = {

	http: {
		isSecure: isSecure,
		transport: isSecure ? 'https://' : 'http://',
		ssl: {

		}
	},
	jwt: {
		secret: getRequiredEnvVar('JWT_SECRET')
	}
}


// Express
config.port = normalizePort(process.env.PORT || '4000');
config.domain = config.isProduction ? 'parra.io' : `${ip.address()}:${config.port}`
config.host = `${config.security.http.transport}${config.domain}`;


// RDS
config.db = {
	uri: getRequiredEnvVar('DB_CONNECTION'),
	debug: true,
	options: { 
		useMongoClient: true
	}
};


config.paths = {
	public: path.join(__dirname, '../public/index.html')
}

config.files = {
	server: {
		models: '../models'
	},
}

config.shared = {
	owasp: {
		allowPassphrases: true,
		maxLength: 128,
		minLength: 10,
		minPhraseLength: 20,
		minOptionalTestsToPass: 4
	}
}

config.mailer = {
	options: {
		
	}
}

config.illegalUsernames = []


if (shouldExit === true) {
	process.exit(1);
}

module.exports = config;
