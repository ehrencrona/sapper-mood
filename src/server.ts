import * as sapper from '@sapper/server';
import compression from 'compression';
import express, { Response } from 'express';
import { auth } from 'express-openid-connect';
import sirv from 'sirv';
import authConfig from './authConfig';
import { connectToDb } from './db';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

connectToDb();

function notAuthorized(res: Response) {
	res.setHeader('Content-Type', 'application/json');
	res.status(401).send(JSON.stringify({ error: 'Not authorized' }));
}

express()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		auth(authConfig),
		(req, res, next) => {
			if (req.path.startsWith('/api') && !req['oidc']?.user) {
				notAuthorized(res);
			} else {
				next();
			}
		},
		(req, res, next) =>
			sapper.middleware({
				session: () => ({
					user: req['oidc'].user
				})
			})(req, res, next)
	)
	.listen(PORT);
