exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.uuid('id').primary().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('account_number').unique();
      table.decimal('balance', 10, 2).defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };