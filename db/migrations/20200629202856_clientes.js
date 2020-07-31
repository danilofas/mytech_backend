
exports.up = function (knex) {
    return knex.schema.createTable('clientes', function (table) {
        table.string('id_cliente').unique().notNullable();
        table.string('id_pessoa').notNullable();
        table.foreign('id_pessoa').references('id_pessoa').inTable('pessoas').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('clientes');
};
