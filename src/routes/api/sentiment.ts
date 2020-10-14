import type { ClientRequest, ServerResponse } from 'http';
import { getSentimentHistory, storeSentiment } from '../../db';
import { formatDate, getToday } from '../../date';
import { getUserId } from './_getUserId';

export async function get(req: ClientRequest, res: ServerResponse, next) {
	res.setHeader('Content-Type', 'application/json');
	const user = getUserId(req);

	let today: number;
	let history = await getSentimentHistory(user);

	if (history.length && history[0].date == formatDate(getToday())) {
		today = history[0].score;
		history = history.slice(1);
	}

	res.end(
		JSON.stringify({
			today,
			history: history,
			user
		})
	);
}

export async function put(req: ClientRequest, res: ServerResponse, next) {
	res.setHeader('Content-Type', 'application/json');

	const body = new Promise<any>((resolve) => {
		req.on('data', (chunk) => {
			resolve(JSON.parse(chunk.toString()));
		});
	});

	const { today: score } = await body;

	await storeSentiment(score, getToday(), getUserId(req));

	res.end(JSON.stringify({}));
}
