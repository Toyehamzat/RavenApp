exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('customer_email').unique().notNullable();
        table.string('password').notNullable();
        table.string('fname').notNullable();
        table.string('lname').notNullable();
        table.string('phone_number').unique();
        table.enum('status', ['active', 'inactive']).defaultTo('active');
        table.string('nin').unique(); // Adding NIN field
        table.string('bvn').unique(); // Adding BVN field
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};