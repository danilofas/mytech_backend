
exports.up = function (knex) {
    return knex.schema.createTable('estados', function (table) {
        table.increments('codigo_uf').primary();
        table.string('uf').notNullable();
        table.string('nome').notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('estados');
};
