import authConfig from '../authConfig';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

const tokenStorageKey = 'token';

let client: Promise<Auth0Client> = createAuth0Client(authConfig);

export async function login() {
	await (await client).loginWithRedirect({
		redirect_uri: window.location.origin
	});
}

export async function getAuthToken(): Promise<string | null> {
	let token =
		typeof window != 'undefined' ? localStorage.getItem(tokenStorageKey) : null;

	const query = window.location.search;

	if (query.includes('code=') && query.includes('state=')) {
		await (await client).handleRedirectCallback();

		window.history.replaceState({}, document.title, '/');

		token = await (await client).getTokenSilently();

		localStorage.setItem(tokenStorageKey, token);
	}

	return token;
}
