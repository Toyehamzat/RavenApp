import { Knex } from 'knex';

exports.up = function(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.string('account_number').unique().notNullable();
        table.string('bank_name').defaultTo('Raven Bank');
        table.decimal('balance', 15, 2).defaultTo(0);
        table.timestamps(true, true);
      });
};

exports.down = function(knex: Knex): Promise<void> {
    return knex.schema.dropTable('accounts');
};
