import type { ClientRequest, ServerResponse } from 'http';
import { getSentimentHistory, storeSentiment } from '../../db';
import { getToday } from '../../date';

export async function get(req: ClientRequest, res: ServerResponse, next) {
	res.setHeader('Content-Type', 'application/json');

	let today: number;
	let history = await getSentimentHistory();

	if (history[0].date == getToday()) {
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

export async function put(req: ClientRequest, res: ServerResponse, next) {
	res.setHeader('Content-Type', 'application/json');

	const body = new Promise<any>((resolve) => {
		req.on('data', (chunk) => {
			resolve(JSON.parse(chunk.toString()));
		});
	});

	const { today: score } = await body;

	await storeSentiment(score, getToday());

	res.end(JSON.stringify({}));
}
