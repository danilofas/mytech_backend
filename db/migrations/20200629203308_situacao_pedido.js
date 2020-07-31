
exports.up = function (knex) {
    return knex.schema.createTable('situacao_pedido', function (table) {
        table.increments('id_situacao').primary();
        table.string('descricao').unique().notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('situacao_pedido');
};
