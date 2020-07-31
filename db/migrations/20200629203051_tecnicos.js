
exports.up = function (knex) {
    return knex.schema.createTable('tecnicos', function (table) {
        table.string('id_tecnico').unique().notNullable();
        table.string('id_pessoa').notNullable();
        table.foreign('id_pessoa').references('id_pessoa').inTable('pessoas').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tecnicos');
};
