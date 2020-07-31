
exports.up = function (knex) {
    return knex.schema.createTable('qualificacao', function (table) {
        table.increments('id_qualificacao').primary();
        table.string('qualificacao').unique().notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('qualificacao');
};
