const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');

const randomHex = crypto.randomBytes(32).toString('hex');

const { NODE_ENV, JWT_SECRET } = process.env;	// import NODE_ENV and JWT_SECRET from .env

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	console.log(req.headers);
	console.log(authorization);

	if (!authorization || !authorization.startsWith('Bearer ')) {
		return res.status(401).send({ message: 'Authorization required' });
	}

	const token = authorization.replace('Bearer ', '');
	let payload;

	try {
		payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : randomHex);
	} catch (err) {
		return res.status(401).send({ message: 'Authorization required' });
	}

	req.user = payload;

	return next();
}
