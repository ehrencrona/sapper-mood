import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import authConfig from './authConfig';
import { connectToDb } from './db';
import { auth } from 'express-openid-connect';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

connectToDb();

express()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		auth(authConfig),
		(req, res, next) =>
			sapper.middleware({
				session: () => ({
					user: req['oidc'].user
				})
			})(req, res, next)
	)
	.listen(PORT);
