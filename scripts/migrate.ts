import knex from 'knex';
import knexConfig from '../src/knexfile';

const environment = process.env.NODE_ENV || 'development';
const configOptions = knexConfig[environment];

const db = knex(configOptions);

db.migrate.latest()
  .then(() => {
    console.log('Migrations completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
