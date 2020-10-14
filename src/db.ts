import * as Knex from 'knex';
import { formatDate } from './date';
import upsert from './upsert';
import type { Day } from './types';
import knexfile from '../knexfile';

let connection: Knex;
const tableName = 'mood';

export async function connectToDb() {
	connection = Knex.default(
		process.env.NODE_ENV === 'production'
			? knexfile.production
			: knexfile.development
	);
}

export function getConnection(): Knex {
	return connection;
}

export async function storeMood(score: number, date: Date, user: string) {
	return upsert(
		tableName,
		['user', 'date'],
		{
			date,
			score,
			user
		},
		await getConnection()
	);
}

export async function getMoodHistory(user: string): Promise<Day[]> {
	return (
		await getConnection()
			.select('date', 'score')
			.from(tableName)
			.where('user', user)
			.orderBy('date', 'desc')
	).map(({ date, score }) => ({
		date: formatDate(date),
		score
	}));
}
