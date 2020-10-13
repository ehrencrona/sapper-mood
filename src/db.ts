import * as Knex from 'knex';
import { formatDate } from './date';
import upsert from './routes/api/upsert';
import type { Day } from './routes/api/_types';

let connection: Knex;

export async function connectToDb() {
	connection = Knex.default({
		client: 'pg',
		connection: {
			host: '127.0.0.1',
			user: 'coaching',
			password: 'coaching',
			database: 'coaching'
		}
	});
}

export function getConnection(): Knex {
	return connection;
}

export async function storeSentiment(score: number, date: string) {
	return upsert(
		'sentiment',
		['user', 'date'],
		{
			date,
			score,
			user: 4711
		},
		await getConnection()
	);
}

export async function getSentimentHistory(): Promise<Day[]> {
	return (
		await getConnection()
			.select('date', 'score')
			.from('sentiment')
			.orderBy('date', 'desc')
	).map(({ date, score }) => ({
		date: formatDate(date),
		score
	}));
}
