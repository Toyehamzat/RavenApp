import { Knex } from 'knex';

/**
 * Knex Configuration
 * @type { Knex.Config }
 */
const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'money_transfer',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/migrations',
      tableName: 'knex_migrations',
    },
  },
};

export default knexConfig;
