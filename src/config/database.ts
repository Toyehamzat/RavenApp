import knex from 'knex';
import { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: path.join(__dirname, 'src/migrations')
  }
};

const db = knex(knexConfig);

export default db;
