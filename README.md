# sapper-mood

A tiny mood tracker app showing how to integrate Svelte, Sapper, Auth0 (for authentication) and Knex (for SQL storage).

It asks you about your mood today and stores your mood history persistently in a Postgres database. It uses hydration, so the the mood data is already present in the server response to avoid refreshing the page after the JavaScript loads. The service worker that comes with the Sapper template provides offline support.

Showing off how minimalist Svelte is, the entire uncompressed JavaScript payload delivered to the client is 27kb (12kb compressed)!

The frontend can be tried on https://quiet-anchorage-27575.herokuapp.com/

** Configuration **

* Configure your Auth0 settings and your base URL in [authConfig.ts](src/authConfig.ts).
* Configure your SQL connection [knexfile.js](./knexfile.js).

** Auth0 **

Create an Auth0 application ("Regular Web Application"), configuring the Allowed Callback URL (to `http://<domain>/callback`), the Allowed Logout URL (to `http://<domain>`) and the Allowed Web Origin (to `http://<domain>`). Separate multiple values by commas.

Basic Auth0 setup lifted from https://enzy.org/blog/integrating-auth0-with-sapper/

** Heroku **

It is very easy to deploy on a free Heroku tier. Just create a Heroku Postgres service and push it to Heroku.
