const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');

const randomHex = crypto.randomBytes(32).toString('hex');
console.log(randomHex);

const { NODE_ENV, JWT_SECRET } = process.env;	// import NODE_ENV and JWT_SECRET from .env

const authenticateToken = (req, res, next) => {
	const { authorization } = req.headers;	// get authorization header
	if (!authorization || !authorization.startsWith('Bearer ')) {	// check if authorization header exists and starts with Bearer
		return res.status(401).send({ message: 'Authorization required' });
	}
	const token = authorization.replace('Bearer ', '');	// extract token
	let payload;
	try {
		payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');	// verify token
	} catch (err) {
		return res.status(401).send({ message: 'Authorization required' });
	}
	req.user = payload;	// add payload to req object
	return next();
};

module.exports = authenticateToken;
