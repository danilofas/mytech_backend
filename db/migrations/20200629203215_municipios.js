
exports.up = function (knex) {
    return knex.schema.createTable('municipios', function (table) {
        table.increments('codigo_ibge').primary();
        table.string('nome').notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        table.boolean('capital').notNullable();
        table.integer('codigo_uf').unsigned();
        table.foreign('codigo_uf').references('codigo_uf').inTable('estados');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('municipios');
};
