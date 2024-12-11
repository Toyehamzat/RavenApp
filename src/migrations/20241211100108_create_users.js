
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.uuid('id').primary().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone_number').unique();
        table.enum('status', ['active', 'inactive']).defaultTo('active');
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
