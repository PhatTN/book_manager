// Update with your config settings.

module.exports = {
  test: {
    client: 'pg',
    connection: {
      port: 5432,
      database: 'book_manager_test',
      user:     'devblock',
      password: 'Abc12345_test',
    },
    migrations: {
      directory: __dirname + '/src/db/migrations/test',
    },
    seeds: {
      directory: __dirname + '/src/db/seeds/test',
    },
  },

  development: {
    client: 'pg',
    connection: {
      port: 5432,
      database: 'book_manager_dev',
      user:     'devblock',
      password: 'Abc12345_dev',
    },
    migrations: {
      directory: __dirname + '/src/db/migrations/development',
    },
    seeds: {
      directory: __dirname + '/src/db/seeds/development',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      port: 5432,
      database: 'book_manager_staging',
      user:     'devblock',
      password: 'Abc12345_staging',
    },
    migrations: {
      directory: __dirname + '/src/db/migrations/staging',
    },
    seeds: {
      directory: __dirname + '/src/db/seeds/staging',
    },
  },

  production: {
    client: 'pg',
    connection: {
      port: 5432,
      database: 'book_manager',
      user:     'devblock',
      password: 'Abc$1234',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/src/db/migrations/production',
    },
    seeds: {
      directory: __dirname + '/src/db/seeds/production',
    },
  },

};
