import type { IncomingMessage } from 'http';

export function getUserId(req: IncomingMessage) {
	const user = req['oidc'].user;

	if (!user) {
		throw new Error('Not authenticated');
	}
	
	return user.sub;
}
