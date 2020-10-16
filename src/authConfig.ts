const dev = process.env.NODE_ENV !== 'production';

/** The Auth0 configuration */
export default {
	authRequired: false,
	auth0Logout: true,
	baseURL: dev
		? 'http://localhost:3000'
		: 'https://quiet-anchorage-27575.herokuapp.com/',

	// these parameters are not secret. You find these in your application on Auth0
	clientID: 'HXS4hEqavw83A7vW6M9VTZuEw7lhVg4F',
	// This is actually called "domain" in the Auth0 admin; prepend "https://"
	issuerBaseURL: 'https://dev-ylt2rw9o.eu.auth0.com',

	// this one is. it must never be included in the client bundle.
	// set it to a long, random string.
	secret: 'AyBYwCy73cBystBD6iZgYFNdquqqP'
};
