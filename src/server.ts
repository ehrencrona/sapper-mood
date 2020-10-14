import * as sapper from '@sapper/server';
import compression from 'compression';
import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import sirv from 'sirv';
import authConfig from './authConfig';
import { connectToDb } from './db';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';

connectToDb();

express()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		auth(authConfig),
		(req, res, next) =>
			req.path.startsWith('/api') ? requiresAuth()(req, res, next) : next(),
		(req, res, next) =>
			sapper.middleware({
				session: () => ({
					user: req['oidc'].user
				})
			})(req, res, next)
	)
	.listen(PORT);
