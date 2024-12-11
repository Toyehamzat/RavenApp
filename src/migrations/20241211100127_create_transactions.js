
exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('sender_account_id').unsigned().references('id').inTable('accounts').nullable();
        table.integer('recipient_account_id').unsigned().references('id').inTable('accounts');
        table.decimal('amount', 15, 2).notNullable();
        table.enum('type', ['deposit', 'transfer', 'withdrawal']).notNullable();
        table.enum('status', ['pending', 'completed', 'failed']).defaultTo('pending');
        table.string('reference_id').unique().notNullable();
        table.string('description').nullable();
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
