// Update with your config settings.

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
    connection: {
      database: 'coaching',
      user:     'coaching',
      password: 'coaching'
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
