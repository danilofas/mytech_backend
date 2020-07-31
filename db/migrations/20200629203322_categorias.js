
exports.up = function(knex) {
    return knex.schema.createTable('categorias', function (table) {
        table.increments('id_categoria').primary();
        table.string('descricao').unique().notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('categorias');
};
