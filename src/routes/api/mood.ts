import type { IncomingMessage, ServerResponse } from 'http';
import { getMoodHistory, storeMood } from '../../db';
import { formatDate, getToday } from '../../date';
import { getUserId } from './_getUserId';

export async function get(req: IncomingMessage, res: ServerResponse, next) {
	res.setHeader('Content-Type', 'application/json');
	const user = getUserId(req);

	let today: number;
	let history = await getMoodHistory(user);

	if (history.length && history[0].date == formatDate(getToday())) {
		today = history[0].score;
		history = history.slice(1);
	}

	res.end(
		JSON.stringify({
			today,
			history: history
		})
	);
}

export async function put(req: IncomingMessage, res: ServerResponse, next) {
	res.setHeader('Content-Type', 'application/json');

	const body = new Promise<any>((resolve) => {
		req.on('data', (chunk) => {
			resolve(JSON.parse(chunk.toString()));
		});
	});

	const { today: score } = await body;

	await storeMood(score, getToday(), getUserId(req));

	res.end(JSON.stringify({}));
}
