const dev = process.env.NODE_ENV !== 'production';

export default {
	authRequired: false,
	auth0Logout: true,
	baseURL: dev
		? 'http://localhost:3000'
		: 'https://quiet-anchorage-27575.herokuapp.com/',
	issuerBaseURL: 'https://dev-ylt2rw9o.eu.auth0.com',
	clientID: 'HXS4hEqavw83A7vW6M9VTZuEw7lhVg4F',
	secret: 'AyBYwCy73cBystBD6iZgYFNdquqqP'
};
