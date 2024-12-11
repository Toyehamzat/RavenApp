exports.up = function(knex) {
  return knex.schema.createTable('wallets', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('account_number').unique().notNullable();
      table.string('bank_name').defaultTo('BestStar MFB'); 
      table.string('account_name').notNullable();
      table.string('reference').unique().notNullable();
      table.decimal('balance', 15, 2).defaultTo(0);
      table.enum('status', ['active', 'blocked']).defaultTo('active');
      table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('wallets');
};
