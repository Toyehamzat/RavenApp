exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('sender_wallet_id').unsigned().references('id').inTable('wallets').nullable(); // Updated from accounts to wallets
        table.integer('recipient_wallet_id').unsigned().references('id').inTable('wallets'); // Updated from accounts to wallets
        table.decimal('amount', 15, 2).notNullable();
        table.enum('type', ['deposit', 'transfer', 'withdrawal']).notNullable();
        table.enum('status', ['pending', 'completed', 'failed']).defaultTo('pending');
        table.string('reference_id').unique().notNullable();
        table.string('description').nullable();
        table.decimal('b_before', 15, 2).nullable(); // Added balance before transaction
        table.decimal('b_after', 15, 2).nullable(); // Added balance after transaction
        table.enum('direction', ['debit', 'credit']).notNullable(); // Added direction field
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};
