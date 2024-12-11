
exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table) {
        table.uuid('id').primary().unique();
        table.uuid('user_id').references('id').inTable('users');
        table.string('type').notNullable(); // deposit, transfer, etc.
        table.decimal('amount', 10, 2).notNullable();
        table.string('status').defaultTo('pending');
        table.string('reference').unique();
        table.uuid('recipient_id').references('id').inTable('users');
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
