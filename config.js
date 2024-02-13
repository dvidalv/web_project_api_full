const dotenv = require('dotenv');
dotenv.config();

const BASE_URL =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_URL
		: 'http://localhost:3000';

module.exports = {
	BASE_URL,
};
