// Postgres connection settings. 
// Do not check in files containing passwords.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'coaching',
      user:     'coaching',
      password: 'coaching'
    }
  },

  production: {
    client: 'postgresql',
    // This environment variable is exposed by Heroku Postgres. 
    // If you deploy in a different environment, it needs replacing.
    connection: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
