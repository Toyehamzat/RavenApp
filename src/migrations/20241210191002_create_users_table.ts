import { Knex } from 'knex';

exports.up = function(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('full_name').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
};
