import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import authConfig from './authConfig';
import { connectToDb } from './db';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
	}),

	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithms: ['RS256']
});

connectToDb();

express()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		(req, res, next) => {
			if (req.path.startsWith('/api/')) {
				return checkJwt(req, res, (e?: any) => {
					if (e) {
						res.setHeader('Content-Type', 'application/json');
						res.status(401).send(
							JSON.stringify({
								error: e.message || e.toString()
							})
						);
					} else {
						return next(e);
					}
				});
			} else {
				return next();
			}
		},
		sapper.middleware()
	)
	.listen(PORT);
