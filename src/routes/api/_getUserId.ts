import type { ClientRequest } from 'http';

export function getUserId(req: ClientRequest) {
	const user = req['user'];

	if (!user) {
		throw new Error('Not authenticated');
	}
	
	return user.sub;
}
